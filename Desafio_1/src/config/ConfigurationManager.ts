import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../types';

export class ConfigurationManager {
  private static instance: ConfigurationManager;
  private config: Config = this.getDefaultConfig();
  private readonly configPath = path.join(process.cwd(), 'config.json');

  private constructor() {
    this.loadConfiguration();
  }

  static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  getConfig(): Config {
    return { ...this.config };
  }

  private getDefaultConfig(): Config {
    return {
      defaultCoin: 'bitcoin',
      buyThreshold: 30000,
      sellThreshold: 70000,
      variationPercentage: 5.0,
      timeWindowMinutes: 15,
      alertType: 'threshold'
    };
  }

  private loadConfiguration(): void {
    try {
      if (!fs.existsSync(this.configPath)) {
        this.createDefaultConfig();
      }

      const configData = fs.readFileSync(this.configPath, 'utf-8');
      this.config = JSON.parse(configData);
    } catch (error) {
      console.warn('Erro ao carregar configuração, usando valores padrão');
      this.config = this.getDefaultConfig();
    }
  }

  private createDefaultConfig(): void {
    const defaultConfig = this.getDefaultConfig();
    fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2));
    this.config = defaultConfig;
    console.log('Arquivo config.json criado com valores padrão');
  }
}