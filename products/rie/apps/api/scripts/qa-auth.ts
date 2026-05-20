import crypto from 'crypto';

const API_URL = process.env.API_URL || 'http://localhost:4000';

async function runFuzzing() {
  console.log('--- STARTING ZERO-TRUST QA FUZZING ---');

  const uniqueUser = `fuzz_${Date.now()}@example.com`;
  console.log(`[1/5] Registering fresh subject to isolate state: ${uniqueUser}`);
  const loginRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Fuzz', username: `fuzz_${Date.now()}`, email: uniqueUser, password: 'password123!' }),
  });
  
  if (loginRes.status !== 201 && loginRes.status !== 200) {
    console.error(`Failed to register seed user. Status: ${loginRes.status}`);
    const errText = await loginRes.text();
    console.error(errText);
    return;
  }

  const setCookieHeader = loginRes.headers.get('set-cookie') || '';
  const accessTokenCookie = setCookieHeader.split(',').find(c => c.trim().startsWith('accessToken='));
  
  if (!accessTokenCookie) {
    console.error('Missing accessToken in Set-Cookie');
    return;
  }

  const rawToken = accessTokenCookie.split('accessToken=')[1].split(';')[0].trim();

  // 2. JWT Signature Tampering
  console.log('[2/5] Fuzzing: Tampered JWT Signature...');
  const [header, payload, sig] = rawToken.split('.');
  
  // Forge the payload (escalating privileges artificially)
  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
  decodedPayload.role = 'ADMIN';
  const forgedPayload = Buffer.from(JSON.stringify(decodedPayload)).toString('base64url');
  
  // Create forged cookie (Signature missing/wrong)
  const tamperedToken = `${header}.${forgedPayload}.forged_signature`;
  
  const tamperedRes = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: { Cookie: `accessToken=${tamperedToken}` }
  });

  if (tamperedRes.status === 401) {
    console.log('✅ PASS: API correctly rejected forged signature JWT (401 Unauthorized)');
  } else {
    console.error(`❌ FAIL: API accepted tampered JWT (Status ${tamperedRes.status})`);
  }

  // 3. Expired Token Fuzzing
  // Let's create a token that expired exactly in 1970
  console.log('[3/5] Fuzzing: Grossly Expired Token...');
  const expiredPayload = Buffer.from(JSON.stringify({ ...decodedPayload, exp: 1000 })).toString('base64url');
  const expiredToken = `${header}.${expiredPayload}.${sig}`; // Sig won't match anyway, but testing the error cascade
  
  const expiredRes = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: { Cookie: `accessToken=${expiredToken}` }
  });

  if (expiredRes.status === 401) {
    console.log('✅ PASS: API rejected expired boundary check (401 Unauthorized)');
  } else {
    console.error(`❌ FAIL: API failed expired check (Status ${expiredRes.status})`);
  }

  // 4. Missing Cookie Header
  console.log('[4/5] Fuzzing: No Headers...');
  const noHeaderRes = await fetch(`${API_URL}/auth/me`, { method: 'GET' });
  if (noHeaderRes.status === 401) {
    console.log('✅ PASS: API safely handled missing cookie header (401 Unauthorized)');
  } else {
    console.error(`❌ FAIL: API crashed or failed to block missing cookie!`);
  }

  // 5. Malformed Token Structure
  console.log('[5/5] Fuzzing: Malformed Token Structure (Non-Base64)...');
  const malformedRes = await fetch(`${API_URL}/auth/me`, { 
    method: 'GET',
    headers: { Cookie: `accessToken=hello_world_this_is_not_a_jwt` }
  });
  if (malformedRes.status === 401) {
    console.log('✅ PASS: API survived malformed structural parse gracefully (401 Unauthorized)');
  } else {
    console.error(`❌ FAIL: API crashed on parse error! Status: ${malformedRes.status}`);
  }

  console.log('--- FUZZING COMPLETE ---');
}

runFuzzing().catch(console.error);
