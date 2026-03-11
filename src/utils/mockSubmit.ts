export async function mockSubmit<T>(
  payload: T,
  failureRate = 0.14,
  delayMs = 1200,
): Promise<{ ok: true; data: T }> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (Math.random() < failureRate) {
    throw new Error('NETWORK_SIMULATION_ERROR');
  }

  return { ok: true, data: payload };
}
