import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app, { warmupApp } from './app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Ensure workspace-root .env is loaded when backend runs in its own cwd.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Fallback to backend-local .env if present.
dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await warmupApp();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Vanilla HTML/CSS/JS client: http://localhost:${PORT}/vanilla/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
