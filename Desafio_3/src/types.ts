export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface IProductProvider {
  load(filePath: string): Promise<Product[]>;
}

export type SupportedFormat = 'csv' | 'xml' | 'json';