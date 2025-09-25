import { IProductProvider, SupportedFormat } from '../types';
import { CsvAdapter } from '../adapters/csvAdapter';
import { JsonAdapter } from '../adapters/jsonAdapter';
import { XmlAdapter } from '../adapters/xmlAdapter';

export class ProductProviderFactory {
  static createProvider(format: SupportedFormat): IProductProvider {
    const providers = {
      csv: () => new CsvAdapter(),
      json: () => new JsonAdapter(),
      xml: () => new XmlAdapter()
    };

    const provider = providers[format];
    if (!provider) {
      throw new Error(`Formato não suportado: ${format}`);
    }

    return provider();
  }

  static getSupportedFormats(): SupportedFormat[] {
    return ['csv', 'json', 'xml'];
  }
}