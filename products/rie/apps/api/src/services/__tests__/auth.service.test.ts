// ─────────────────────────────────────────────────────────
// Auth Service Tests
// ─────────────────────────────────────────────────────────

import { AuthService } from '../auth.service';

// ── Mock @prisma/client ──────────────────────────────────

// var declarations are hoisted (unlike const/let) so jest.mock() factory
// closures can reference them without hitting the temporal dead zone.
/* eslint-disable no-var */
var mockFindFirst = jest.fn();
var mockUserCreate = jest.fn();
var mockTrustScoreCreate = jest.fn();
var mockAuditLogCreate = jest.fn();
var mockSessionCreate = jest.fn();
var mockUserFindUnique = jest.fn();
var mockSessionFindUnique = jest.fn();
var mockSessionDelete = jest.fn();
var mockTransaction = jest.fn();
/* eslint-enable no-var */

// Use arrow-function wrappers so each method resolves the var at call time,
// not at PrismaClient construction time (which happens during module init,
// before the var assignments run).
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findFirst: (...args: unknown[]) => mockFindFirst(...args),
        findUnique: (...args: unknown[]) => mockUserFindUnique(...args),
        create: (...args: unknown[]) => mockUserCreate(...args),
      },
      trustScore: {
        create: (...args: unknown[]) => mockTrustScoreCreate(...args),
      },
      auditLog: {
        create: (...args: unknown[]) => mockAuditLogCreate(...args),
      },
      session: {
        create: (...args: unknown[]) => mockSessionCreate(...args),
        findUnique: (...args: unknown[]) => mockSessionFindUnique(...args),
        delete: (...args: unknown[]) => mockSessionDelete(...args),
        deleteMany: jest.fn(),
      },
      $transaction: (...args: unknown[]) => mockTransaction(...args),
    })),
  };
});

// ── Mock @rie/crypto ─────────────────────────────────────

/* eslint-disable no-var */
var mockHashPassword = jest.fn();
var mockVerifyPassword = jest.fn();
var mockEncrypt = jest.fn();
var mockDecrypt = jest.fn();
var mockCreateTokenPair = jest.fn();
/* eslint-enable no-var */

jest.mock('@rie/crypto', () => ({
  hashPassword: (...args: unknown[]) => mockHashPassword(...args),
  verifyPassword: (...args: unknown[]) => mockVerifyPassword(...args),
  encrypt: (...args: unknown[]) => mockEncrypt(...args),
  decrypt: (...args: unknown[]) => mockDecrypt(...args),
  createTokenPair: (...args: unknown[]) => mockCreateTokenPair(...args),
}));

// ── Fixtures ─────────────────────────────────────────────

const ENCRYPTION_KEY = 'a'.repeat(64); // 64-char hex = 32 bytes

const MOCK_TOKEN_PAIR = {
  accessToken: 'access.token.mock',
  refreshToken: 'refresh.token.mock',
};

const MOCK_USER = {
  id: 'user-001',
  username: 'testuser',
  email: JSON.stringify({ ciphertext: 'enc', iv: 'iv', tag: 'tag' }),
  emailHash: 'abc123',
  passwordHash: '$argon2id$v=19$...',
  subscriptionTier: 'free',
  createdAt: new Date(),
};

const MOCK_SESSION = {
  id: 'session-001',
  userId: 'user-001',
  refreshToken: 'hashed-refresh',
  deviceId: null,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};

// ── Test Suite ───────────────────────────────────────────

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(() => {
    process.env.ENCRYPTION_KEY = ENCRYPTION_KEY;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService();

    // Default happy-path stubs
    mockCreateTokenPair.mockResolvedValue(MOCK_TOKEN_PAIR);
    mockEncrypt.mockReturnValue({ ciphertext: 'enc', iv: 'iv', tag: 'tag' });
    mockDecrypt.mockReturnValue('test@example.com');
    mockHashPassword.mockResolvedValue('$argon2id$v=19$...');
    mockVerifyPassword.mockResolvedValue(true);
    mockSessionCreate.mockResolvedValue(MOCK_SESSION);
    mockAuditLogCreate.mockResolvedValue({});
  });

  // ── register() ────────────────────────────────────────

  describe('register()', () => {
    const registerInput = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      name: 'Test User',
      username: 'testuser',
    };

    it('creates a new user and returns a token pair on success', async () => {
      mockFindFirst.mockResolvedValue(null);

      const createdUser = { ...MOCK_USER };
      mockTransaction.mockImplementation(async (fn: (tx: unknown) => Promise<unknown>) => {
        const tx = {
          user: { create: jest.fn().mockResolvedValue(createdUser) },
          trustScore: { create: mockTrustScoreCreate.mockResolvedValue({}) },
          auditLog: { create: mockAuditLogCreate.mockResolvedValue({}) },
        };
        return fn(tx);
      });

      const result = await service.register(registerInput);

      expect(result.user.username).toBe('testuser');
      expect(result.user.email).toBe('test@example.com');
      expect(result.tokens.accessToken).toBe('access.token.mock');
      expect(result.tokens.refreshToken).toBe('refresh.token.mock');
      expect(result.tokens.expiresIn).toBe(900);
      expect(mockHashPassword).toHaveBeenCalledWith('SecurePass123!');
      expect(mockCreateTokenPair).toHaveBeenCalledWith({ sub: createdUser.id });
    });

    it('throws EMAIL_EXISTS when the email is already registered', async () => {
      // The engine computes sha256('test@example.com') and compares it against
      // existing.emailHash — we must supply the exact hash for the branch to fire.
      const EMAIL_HASH = '973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b';
      mockFindFirst.mockResolvedValue({ ...MOCK_USER, emailHash: EMAIL_HASH });

      await expect(service.register(registerInput)).rejects.toThrow('EMAIL_EXISTS');
      expect(mockTransaction).not.toHaveBeenCalled();
    });

    it('throws USERNAME_EXISTS when the username is already taken', async () => {
      // Return a user whose emailHash differs so the branch resolves to username conflict
      mockFindFirst.mockResolvedValue({ ...MOCK_USER, emailHash: 'different-hash' });

      await expect(service.register(registerInput)).rejects.toThrow('USERNAME_EXISTS');
    });
  });

  // ── login() ───────────────────────────────────────────

  describe('login()', () => {
    const loginInput = { email: 'test@example.com', password: 'SecurePass123!' };

    it('returns tokens and decrypted user data on success', async () => {
      mockUserFindUnique.mockResolvedValue(MOCK_USER);
      mockVerifyPassword.mockResolvedValue(true);
      mockDecrypt.mockReturnValue('test@example.com');

      const result = await service.login(loginInput);

      expect(result.user.id).toBe('user-001');
      expect(result.user.email).toBe('test@example.com');
      expect(result.tokens.accessToken).toBe('access.token.mock');
      expect(mockVerifyPassword).toHaveBeenCalledWith('SecurePass123!', MOCK_USER.passwordHash);
    });

    it('throws INVALID_CREDENTIALS when the user does not exist', async () => {
      mockUserFindUnique.mockResolvedValue(null);

      await expect(service.login(loginInput)).rejects.toThrow('INVALID_CREDENTIALS');
      expect(mockVerifyPassword).not.toHaveBeenCalled();
    });

    it('throws INVALID_CREDENTIALS and logs an audit entry when password is wrong', async () => {
      mockUserFindUnique.mockResolvedValue(MOCK_USER);
      mockVerifyPassword.mockResolvedValue(false);

      await expect(service.login(loginInput)).rejects.toThrow('INVALID_CREDENTIALS');
      expect(mockAuditLogCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ action: 'user.login_failed' }),
        }),
      );
    });
  });

  // ── refreshTokens() ───────────────────────────────────

  describe('refreshTokens()', () => {
    it('returns a new token pair for a valid, unexpired session', async () => {
      mockSessionFindUnique.mockResolvedValue(MOCK_SESSION);
      mockTransaction.mockResolvedValue([{}, MOCK_SESSION]);

      const result = await service.refreshTokens('refresh.token.mock');

      expect(result.accessToken).toBe('access.token.mock');
      expect(result.refreshToken).toBe('refresh.token.mock');
      expect(result.expiresIn).toBe(900);
      expect(mockCreateTokenPair).toHaveBeenCalledWith({ sub: MOCK_SESSION.userId });
    });

    it('throws SESSION_EXPIRED when no session is found', async () => {
      mockSessionFindUnique.mockResolvedValue(null);

      await expect(service.refreshTokens('bad.token')).rejects.toThrow('SESSION_EXPIRED');
      expect(mockCreateTokenPair).not.toHaveBeenCalled();
    });

    it('throws SESSION_EXPIRED when the session has passed its expiry date', async () => {
      const expiredSession = {
        ...MOCK_SESSION,
        expiresAt: new Date(Date.now() - 1000), // 1 second in the past
      };
      mockSessionFindUnique.mockResolvedValue(expiredSession);

      await expect(service.refreshTokens('expired.token')).rejects.toThrow('SESSION_EXPIRED');
    });
  });
});
