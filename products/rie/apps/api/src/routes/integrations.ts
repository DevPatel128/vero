import { Router, Request, Response, NextFunction } from 'express';
import { createHash } from 'crypto';
import { integrationService, INTEGRATIONS } from '../services/integration.service';
import { ApiError } from '../middleware/error-handler';
import { authenticate } from '../middleware/auth';
import { submissionService } from '../services/submission.service';

export const integrationRouter = Router();

/**
 * GET /integrations
 * List all available integrations and which ones the user has connected
 */
integrationRouter.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const connected = await integrationService.listConnected(userId);

    res.json({
      success: true,
      data: {
        available: INTEGRATIONS,
        connected,
      },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /integrations/:provider/auth
 * Returns OAuth authorization URL
 */
integrationRouter.get('/:provider/auth', authenticate, (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = req.params.provider as keyof typeof INTEGRATIONS;
    const userId = (req as any).userId;
    const redirectUri = (req.query.redirectUri as string) || `${process.env.APP_URL || 'rie://'}integrations/callback`;

    if (!(provider in INTEGRATIONS)) {
      throw ApiError.badRequest('Invalid provider');
    }

    const authUrl = integrationService.getAuthUrl(provider, userId, redirectUri);

    res.json({
      success: true,
      data: { url: authUrl },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /integrations/:provider/callback
 * OAuth callback — exchange code for token and store encrypted
 */
integrationRouter.get('/:provider/callback', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = req.params.provider as keyof typeof INTEGRATIONS;
    const { code, state, error: oauthError } = req.query as Record<string, string>;

    if (oauthError) {
      return res.redirect(`rie://integrations/result?success=false&error=${encodeURIComponent(oauthError)}`);
    }

    if (!code || !state) {
      throw ApiError.badRequest('Missing code or state parameter');
    }

    const userId = await integrationService.validateOAuthState(state);
    const redirectUri = `${process.env.API_BASE_URL || 'http://localhost:3001'}/integrations/${provider}/callback`;

    await integrationService.exchangeCode(provider, userId, code, redirectUri);

    res.redirect(`rie://integrations/result?success=true&provider=${provider}`);
  } catch (err: any) {
    if (err.message === 'Invalid OAuth state') {
      return res.redirect('rie://integrations/result?success=false&error=invalid_state');
    }
    next(err);
  }
});

/**
 * POST /integrations/:provider/sync
 * Fetch and import recent activities from a connected provider
 */
integrationRouter.post('/:provider/sync', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = req.params.provider;
    const userId = (req as any).userId;

    const token = await integrationService.loadToken(userId, provider);
    if (!token) {
      throw ApiError.badRequest(`${provider} is not connected. Connect it first via /integrations/${provider}/auth.`);
    }

    const activities = await integrationService.fetchActivities(provider, token);

    let imported = 0;
    let skipped = 0;

    for (const activity of activities) {
      try {
        const config = (INTEGRATIONS as any)[provider];
        const contentStr = JSON.stringify(activity.raw);
        // Server-generated signature for API-imported activities (no device key available)
        const userSignature = createHash('sha256').update(`${userId}:${provider}:${activity.timestamp}:${contentStr}`).digest('hex');

        await submissionService.submit({
          userId,
          domainId: config?.domain ?? 'fitness',
          activityType: activity.activityType,
          proofType: config?.proofType ?? 'api',
          content: contentStr,
          userSignature,
          metadata: { ...activity.metrics, timestamp: activity.timestamp, duration: activity.duration, importedFrom: provider },
        });
        imported++;
      } catch {
        skipped++;
      }
    }

    res.json({
      success: true,
      data: { imported, skipped },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /integrations/:provider
 * Disconnect a provider
 */
integrationRouter.delete('/:provider', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = req.params.provider;
    const userId = (req as any).userId;
    await integrationService.disconnect(userId, provider);
    res.json({
      success: true,
      data: { message: `${provider} disconnected.` },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
});
