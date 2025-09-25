import * as fs from 'fs';
import { IProductProvider, Product } from '../types';

export class XmlAdapter implements IProductProvider {
  async load(filePath: string): Promise<Product[]> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const products: Product[] = [];
      
      const productMatches = content.match(/<product[^>]*>.*?<\/product>/gs) || [];
      
      productMatches.forEach(productXml => {
        const id = this.extractValue(productXml, 'id') || this.extractAttribute(productXml, 'id');
        const name = this.extractValue(productXml, 'name') || this.extractValue(productXml, 'title');
        const price = this.extractValue(productXml, 'price') || this.extractValue(productXml, 'cost');
        
        if (id && name && price) {
          products.push({
            id: String(id),
            name: String(name),
            price: parseFloat(String(price))
          });
        }
      });
      
      return products;
    } catch (error) {
      throw new Error(`Erro ao processar arquivo XML: ${error}`);
    }
  }

  private extractValue(xml: string, tag: string): string | null {
    const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`, 'i'));
    return match ? match[1].trim() : null;
  }

  private extractAttribute(xml: string, attr: string): string | null {
    const match = xml.match(new RegExp(`${attr}=["']([^"']*)["']`, 'i'));
    return match ? match[1] : null;
  }
}