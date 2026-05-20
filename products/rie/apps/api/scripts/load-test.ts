const API_URL = process.env.API_URL || 'http://localhost:4000';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '100', 10);
const TOTAL_REQUESTS = parseInt(process.env.TOTAL_REQUESTS || '1000', 10);

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function attackLogin() {
  const start = Date.now();
  let success = 0;
  let failed = 0;
  let rateLimited = 0;

  console.log(`Starting Load Test: ${TOTAL_REQUESTS} requests with concurrency ${CONCURRENCY}`);

  // Create an array of tasks
  const tasks = Array.from({ length: TOTAL_REQUESTS }).map((_, i) => async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `user${i}@example.com`, password: 'password123!' }),
      });
      
      if (res.status === 200) success++;
      else if (res.status === 429) rateLimited++;
      else failed++;
    } catch (err) {
      failed++;
    }
  });

  // Execute in batches
  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(fn => fn()));
    process.stdout.write(`\rProgress: ${Math.min(i + CONCURRENCY, TOTAL_REQUESTS)} / ${TOTAL_REQUESTS}`);
  }

  const duration = (Date.now() - start) / 1000;
  console.log('\n\n--- Load Test Results ---');
  console.log(`Total Time: ${duration.toFixed(2)}s`);
  console.log(`Req/Sec   : ${(TOTAL_REQUESTS / duration).toFixed(2)}`);
  console.log(`Success   : ${success}`);
  console.log(`Failed    : ${failed}`);
  console.log(`Blocked(429): ${rateLimited}`);
  console.log('-------------------------');
}

attackLogin().catch(console.error);
