/**
 * Application Entry File for Node.js environments
 * (cPanel, Passenger, Cloud Run, Render, Railway, Docker, PM2)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Directly import TypeScript server (native in Node.js 22+)
  await import('./server.ts');
} catch (tsErr) {
  const distServer = path.join(__dirname, 'dist', 'server.cjs');
  if (fs.existsSync(distServer)) {
    await import(distServer);
  } else {
    console.error('Failed to boot server.ts and no dist/server.cjs found:', tsErr);
    process.exit(1);
  }
}
