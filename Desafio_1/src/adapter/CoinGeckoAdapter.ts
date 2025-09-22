import fetch from 'node-fetch';
import { CryptoApiResponse, ICryptoApiAdapter } from '../types';

export class CoinGeckoApiAdapter implements ICryptoApiAdapter {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  async getPrice(coinId: string): Promise<number> {
    try {
      const url = `${this.baseUrl}/simple/price?ids=${coinId}&vs_currencies=usd`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json() as CryptoApiResponse;
      
      if (!data[coinId]) {
        throw new Error(`Moeda '${coinId}' não encontrada`);
      }

      return data[coinId].usd;
    } catch (error) {
      throw new Error(`Erro ao obter preço: ${error}`);
    }
  }
}