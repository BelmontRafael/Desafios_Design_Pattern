import { Config, IAlertStrategy } from '../types';

export class ThresholdStrategy implements IAlertStrategy {
  constructor(private config: Config) {}

  shouldAlert(price: number): boolean {
    return price <= this.config.buyThreshold || price >= this.config.sellThreshold;
  }

  getAlertMessage(price: number): string {
    const { defaultCoin: coin, buyThreshold: buy, sellThreshold: sell } = this.config;
    
    if (price <= buy) return `${coin} → COMPRAR: $${price.toFixed(2)} (≤ $${buy})`;
    if (price >= sell) return `${coin} → VENDER: $${price.toFixed(2)} (≥ $${sell})`;
    return '';
  }
}