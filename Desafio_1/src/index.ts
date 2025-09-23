import { CryptoMonitorApp } from './CryptoMonitorApp';

async function main() {
  try {
    const app = new CryptoMonitorApp();
    await app.run();
  } catch (error) {
    console.error('Erro fatal:', error);
    process.exit(1);
  }
}

main();