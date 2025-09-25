import * as fs from 'fs';
import { IProductProvider, Product } from '../types';

export class JsonAdapter implements IProductProvider {
  async load(filePath: string): Promise<Product[]> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      
      const products = Array.isArray(data) ? data : data.products || [];
      
      return products.map((item: any) => ({
        id: String(item.id || item.productId || ''),
        name: String(item.name || item.productName || ''),
        price: parseFloat(item.price || item.cost || 0)
      }));
    } catch (error) {
      throw new Error(`Erro ao processar arquivo JSON: ${error}`);
    }
  }
}