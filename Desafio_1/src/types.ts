// === TIPOS DE DADOS ===
export interface Config {
  defaultCoin: string;
  buyThreshold: number;
  sellThreshold: number;
  variationPercentage: number;
  timeWindowMinutes: number;
  alertType: 'threshold' | 'variation';
}

export interface PriceData {
  price: number;
  timestamp: Date;
}

export interface CryptoApiResponse {
  [key: string]: {
    usd: number;
  };
}

export interface ICryptoApiAdapter {
  getPrice(coinId: string): Promise<number>;
}

export interface IAlertStrategy {
  shouldAlert(currentPrice: number): boolean;
  getAlertMessage(currentPrice: number): string;
}