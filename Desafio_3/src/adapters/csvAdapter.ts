import * as fs from 'fs';
import { IProductProvider, Product } from '../types';

export class CsvAdapter implements IProductProvider {
  async load(filePath: string): Promise<Product[]> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.trim().split('\n');
      
      if (lines.length === 0) return [];
      
      const dataLines = lines[0].includes('id') || lines[0].includes('name') ? lines.slice(1) : lines;
      
      return dataLines.map(line => {
        const [id, name, price] = line.split(',').map(field => field.trim());
        return {
          id,
          name,
          price: parseFloat(price)
        };
      });
    } catch (error) {
      throw new Error(`Erro ao processar arquivo CSV: ${error}`);
    }
  }
}