export async function getProgram() {
  const res = await fetch('/api/program');
  if (!res.ok) throw new Error('Failed to fetch program');
  return res.json();
}

export async function getLogs() {
  const res = await fetch('/api/logs');
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
}

export async function saveLog(logData: any) {
  const res = await fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logData),
  });
  if (!res.ok) throw new Error('Failed to save log');
  return res.json();
}
