import { Config, IAlertStrategy, PriceData } from '../types';

export class VariationStrategy implements IAlertStrategy {
  private priceHistory: PriceData[] = [];

  constructor(private config: Config) {}

  shouldAlert(currentPrice: number): boolean {
    const now = new Date();
    this.priceHistory.push({ price: currentPrice, timestamp: now });

    const cutoffTime = new Date(now.getTime() - this.config.timeWindowMinutes * 60 * 1000);
    this.priceHistory = this.priceHistory.filter(p => p.timestamp >= cutoffTime);

    if (this.priceHistory.length < 2) return false;

    const oldestPrice = this.priceHistory[0].price;
    const variation = Math.abs((currentPrice - oldestPrice) / oldestPrice * 100);

    return variation >= this.config.variationPercentage;
  }

  getAlertMessage(currentPrice: number): string {
    if (this.priceHistory.length < 2) return '';

    const oldestPrice = this.priceHistory[0].price;
    const variation = (currentPrice - oldestPrice) / oldestPrice * 100;
    const direction = variation > 0 ? 'subiu' : 'caiu';
    const { defaultCoin: coin, timeWindowMinutes: minutes } = this.config;

    return `${coin} ${direction} ${Math.abs(variation).toFixed(1)}% nos últimos ${minutes} minutos`;
  }
}