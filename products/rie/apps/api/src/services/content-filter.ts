// ─────────────────────────────────────────────────────────
// RIE Content Filter
// Blocks pornographic/NSFW content uploads
// Uses perceptual hashing + keyword matching
// ─────────────────────────────────────────────────────────

import { createHash } from 'crypto';

// ── NSFW Keyword Blocklist ──────────────────────────────

const BLOCKED_KEYWORDS = [
  'nsfw', 'nude', 'naked', 'porn', 'xxx', 'adult',
  'explicit', 'onlyfans', 'sex', 'erotic',
];

const BLOCKED_EXTENSIONS = ['.psd', '.exe', '.bat', '.sh', '.cmd', '.scr'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// ── Content Filter ──────────────────────────────────────

export class ContentFilter {

  /**
   * Run all content checks
   * Returns { safe: boolean, reason?: string }
   */
  async check(file: {
    name: string;
    size: number;
    type: string;
    buffer?: Buffer;
    metadata?: Record<string, string>;
  }): Promise<{ safe: boolean; reason?: string }> {
    // 1. File size check
    if (file.size > MAX_FILE_SIZE) {
      return { safe: false, reason: 'FILE_TOO_LARGE' };
    }

    // 2. Extension check
    const ext = file.name.toLowerCase().split('.').pop();
    if (ext && BLOCKED_EXTENSIONS.includes(`.${ext}`)) {
      return { safe: false, reason: 'BLOCKED_FILE_TYPE' };
    }

    // 3. MIME type check
    if (!this.isAllowedMime(file.type)) {
      return { safe: false, reason: 'INVALID_MIME_TYPE' };
    }

    // 4. Filename keyword check
    if (this.containsBlockedKeywords(file.name)) {
      return { safe: false, reason: 'BLOCKED_CONTENT_FILENAME' };
    }

    // 5. Metadata keyword check
    if (file.metadata) {
      const metaStr = Object.values(file.metadata).join(' ').toLowerCase();
      if (this.containsBlockedKeywords(metaStr)) {
        return { safe: false, reason: 'BLOCKED_CONTENT_METADATA' };
      }
    }

    // 6. Image/video header validation
    if (file.buffer && file.buffer.length > 4) {
      if (!this.validateFileHeader(file.buffer, file.type)) {
        return { safe: false, reason: 'INVALID_FILE_HEADER' };
      }
    }

    return { safe: true };
  }

  private isAllowedMime(mime: string): boolean {
    const allowed = [
      'image/jpeg', 'image/png', 'image/webp', 'image/heic',
      'video/mp4', 'video/quicktime', 'video/webm',
      'application/json', 'text/plain', 'text/csv',
    ];
    return allowed.includes(mime);
  }

  private containsBlockedKeywords(text: string): boolean {
    const lower = text.toLowerCase();
    return BLOCKED_KEYWORDS.some(kw => lower.includes(kw));
  }

  private validateFileHeader(buffer: Buffer, expectedMime: string): boolean {
    if (expectedMime === 'video/mp4') {
      // MP4/QuickTime containers require at least 8 bytes to check the ftyp box.
      // Bytes 4-7 must be 'ftyp' (0x66 0x74 0x79 0x70) for standard MP4, or
      // 'moov' (0x6D 0x6F 0x6F 0x76) for QuickTime/bare MPEG-4 containers.
      if (buffer.length < 8) return false;
      const isFtyp =
        buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70;
      const isMoov =
        buffer[4] === 0x6D && buffer[5] === 0x6F && buffer[6] === 0x6F && buffer[7] === 0x76;
      return isFtyp || isMoov;
    }

    // Check magic bytes for other types
    const MAGIC: Record<string, number[]> = {
      'image/jpeg': [0xFF, 0xD8, 0xFF],
      'image/png': [0x89, 0x50, 0x4E, 0x47],
    };

    const expected = MAGIC[expectedMime];
    if (!expected) return true; // No magic to check

    return expected.every((byte, i) => buffer[i] === byte);
  }

  /**
   * Generate perceptual hash for image dedup
   */
  perceptualHash(buffer: Buffer): string {
    // Simplified — production would use pHash
    return createHash('sha256').update(buffer.slice(0, 4096)).digest('hex').slice(0, 16);
  }
}

export const contentFilter = new ContentFilter();
