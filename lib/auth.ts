import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(username: string, password: string) {
  // In production, replace with actual user verification
  if (username === process.env.OWNER_USERNAME && 
      password === process.env.OWNER_PASSWORD) {
    const token = await encrypt({ username, role: 'owner' });
    cookies().set('owner_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    return true;
  }
  return false;
}

export async function logout() {
  cookies().delete('owner_session');
}

export async function getOwnerSession() {
  const token = cookies().get('owner_session');
  if (!token) return null;
  return await decrypt(token.value);
}