import {
  SignJWT,
  jwtVerify,
  importPKCS8,
  importSPKI,
  type JWTPayload,
} from "jose";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "7d";
const ALGORITHM = "RS256";

async function getPrivateKey() {
  const key = process.env.JWT_PRIVATE_KEY;
  if (!key) throw new Error("JWT_PRIVATE_KEY not set");
  return importPKCS8(key.replace(/\\n/g, "\n"), ALGORITHM);
}

async function getPublicKey() {
  const key = process.env.JWT_PUBLIC_KEY;
  if (!key) throw new Error("JWT_PUBLIC_KEY not set");
  return importSPKI(key.replace(/\\n/g, "\n"), ALGORITHM);
}

export async function signAccessToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(await getPrivateKey());
}

export async function signRefreshToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_TTL)
    .sign(await getPrivateKey());
}

export async function verifyToken(token: string) {
  return jwtVerify(token, await getPublicKey(), { algorithms: [ALGORITHM] });
}
