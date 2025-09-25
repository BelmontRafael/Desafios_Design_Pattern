import { Product, IProductProvider } from './types';

import * as fs from 'fs';
import { ArgumentParser } from './utils/argumentParser';
import { ProductProviderFactory } from './factory/productProvider';

export class ProductProcessor {
  async processFile(args: string[]): Promise<void> {
    try {
      const { input, format } = ArgumentParser.parse(args);
      
      this.validateFile(input);
      
      console.log(`Processando arquivo: ${input}`);
      console.log(`Formato: ${format.toUpperCase()}`);
      console.log('─'.repeat(50));

      const provider: IProductProvider = ProductProviderFactory.createProvider(format);
      const products: Product[] = await provider.load(input);

      this.displayResults(products);
      
    } catch (error) {
      console.error(`Erro: ${error}`);
      this.showUsage();
    }
  }

  private validateFile(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
  }

  private displayResults(products: Product[]): void {
    console.log(`\n${products.length} produto(s) processado(s):\n`);
    
    if (products.length === 0) {
      console.log('Nenhum produto encontrado no arquivo.');
      return;
    }

    console.log(JSON.stringify(products, null, 2));
    
    const total = products.reduce((sum, product) => sum + product.price, 0);
    console.log(`\nValor total dos produtos: $${total.toFixed(2)}`);
  }

  private showUsage(): void {
    console.log('\nUso correto:');
    console.log('node app.js --input <arquivo> --format=<csv|json|xml>');
    console.log('\nExemplos:');
    console.log('node app.js --input produtos.csv --format=csv');
    console.log('node app.js --input produtos.json --format=json');
    console.log('node app.js --input produtos.xml --format=xml');
  }
}