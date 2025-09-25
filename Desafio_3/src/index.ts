import { ProductProcessor } from './productProcessor';

async function main() {
  const processor = new ProductProcessor();
  await processor.processFile(process.argv.slice(2));
}

main().catch(console.error);