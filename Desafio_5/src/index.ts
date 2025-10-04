import { LogisticsApp } from './logisticApp';

async function main() {
  try {
    const app = new LogisticsApp();
    await app.run();
  } catch (error) {
    console.error('Erro fatal:', error);
    process.exit(1);
  }
}

main();