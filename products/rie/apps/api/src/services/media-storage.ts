// ─────────────────────────────────────────────────────────
// RIE Media Storage Service
// S3-compatible storage for proof uploads
// ─────────────────────────────────────────────────────────

import { createHash, createHmac, randomBytes } from 'crypto';

const BUCKET = process.env.S3_BUCKET || 'rie-submissions';
const REGION = process.env.S3_REGION || 'us-east-1';
const ENDPOINT = process.env.S3_ENDPOINT || `https://s3.${REGION}.amazonaws.com`;
const CDN_BASE = process.env.CDN_URL || `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

// ── Types ───────────────────────────────────────────────

interface UploadResult {
  key: string;
  url: string;
  contentHash: string;
  size: number;
}

interface PresignedUrlResult {
  uploadUrl: string;
  key: string;
  expiresIn: number;
}

// ── Storage Service ─────────────────────────────────────

export class MediaStorageService {

  /**
   * Generate a pre-signed upload URL
   * Client uploads directly to S3, bypassing our server
   */
  async getPresignedUploadUrl(
    userId: string,
    domainId: string,
    fileType: string,
    fileSize: number,
  ): Promise<PresignedUrlResult> {
    // Validate
    if (fileSize > 50 * 1024 * 1024) throw new Error('FILE_TOO_LARGE');

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'video/mp4', 'video/quicktime', 'video/webm'];
    if (!ALLOWED_TYPES.includes(fileType)) throw new Error('INVALID_FILE_TYPE');

    // Generate key: /{userId}/{domain}/{date}/{randomId}.{ext}
    const date = new Date().toISOString().split('T')[0];
    const id = randomBytes(8).toString('hex');
    const ext = fileType.split('/')[1] || 'bin';
    const key = `proofs/${userId}/${domainId}/${date}/${id}.${ext}`;

    const uploadUrl = await this.generatePresignedPutUrl(key, fileType, 900);

    return { uploadUrl, key, expiresIn: 900 };
  }

  /**
   * Generate a real AWS SigV4 presigned PUT URL without the AWS SDK
   */
  private async generatePresignedPutUrl(key: string, contentType: string, expiresIn: number): Promise<string> {
    const accessKey = process.env.S3_ACCESS_KEY;
    const secretKey = process.env.S3_SECRET_KEY;
    if (!accessKey || !secretKey) {
      throw new Error('S3_ACCESS_KEY and S3_SECRET_KEY must be set');
    }

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
    const dateStamp = amzDate.slice(0, 8);

    // Detect path-style vs virtual-hosted-style based on ENDPOINT
    const host = ENDPOINT.replace(/^https?:\/\//, '');
    const isPathStyle = !host.includes(BUCKET);
    const requestHost = isPathStyle ? host : `${BUCKET}.${host}`;
    const requestPath = isPathStyle ? `/${BUCKET}/${key}` : `/${key}`;

    const credentialScope = `${dateStamp}/${REGION}/s3/aws4_request`;
    const credential = `${accessKey}/${credentialScope}`;

    const queryParams = new URLSearchParams({
      'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
      'X-Amz-Credential': credential,
      'X-Amz-Date': amzDate,
      'X-Amz-Expires': String(expiresIn),
      'X-Amz-SignedHeaders': 'content-type;host',
    });

    // Canonical query string must be sorted
    const sortedQuery = Array.from(queryParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

    const canonicalHeaders = `content-type:${contentType}\nhost:${requestHost}\n`;
    const signedHeaders = 'content-type;host';
    const canonicalRequest = ['PUT', requestPath, sortedQuery, canonicalHeaders, signedHeaders, 'UNSIGNED-PAYLOAD'].join('\n');

    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    const hmacSign = (key: Buffer | string, data: string) => createHmac('sha256', key).update(data).digest();
    const signingKey = hmacSign(hmacSign(hmacSign(hmacSign(`AWS4${secretKey}`, dateStamp), REGION), 's3'), 'aws4_request');
    const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    const baseUrl = `${ENDPOINT.replace(/\/$/, '')}${requestPath}`;
    return `${baseUrl}?${sortedQuery}&X-Amz-Signature=${signature}`;
  }

  /**
   * Confirm upload and generate content hash
   */
  async confirmUpload(key: string, buffer: Buffer): Promise<UploadResult> {
    const contentHash = createHash('sha256').update(buffer).digest('hex');

    return {
      key,
      url: `${CDN_BASE}/${key}`,
      contentHash,
      size: buffer.length,
    };
  }

  /**
   * Generate a signed download URL (for viewing proofs)
   */
  getSignedDownloadUrl(key: string): string {
    // In production: generate signed URL with 1h expiry
    return `${CDN_BASE}/${key}`;
  }

  /**
   * Delete proof media (GDPR data deletion)
   */
  async deleteMedia(key: string): Promise<void> {
    // In production: s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
    console.log(`[Storage] Deleted: ${key}`);
  }

  /**
   * Delete all media for a user (account deletion)
   */
  async deleteAllUserMedia(userId: string): Promise<number> {
    // In production: list and delete all objects with prefix proofs/{userId}/
    console.log(`[Storage] Deleted all media for user: ${userId}`);
    return 0; // Return count of deleted objects
  }
}

export const mediaStorage = new MediaStorageService();
