import { ConfigurationManager } from './config/ConfigurationManager';
import { ThresholdStrategy } from './strategies/ThresholdStrategy';
import { VariationStrategy } from './strategies/VariationStrategy';
import { UserInputHelper } from './utils/UserInputHelper';
import { Config, IAlertStrategy, ICryptoApiAdapter } from './types';
import { CoinGeckoApiAdapter } from './adapter/CoinGeckoAdapter';

export class CryptoMonitorApp {
  private cryptoApi: ICryptoApiAdapter;
  private config: Config;
  private currentStrategy: IAlertStrategy;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private inputHelper: UserInputHelper;
  private currentCoin: string;

  constructor() {
    this.cryptoApi = new CoinGeckoApiAdapter();
    this.config = ConfigurationManager.getInstance().getConfig();
    this.currentCoin = this.config.defaultCoin;
    this.currentStrategy = this.createStrategy();
    this.inputHelper = new UserInputHelper();
  }

  async run(): Promise<void> {
    await this.setupCoin();
    this.showMenu();
    this.startMonitoring();
    await this.handleCommands();
  }

  private async setupCoin(): Promise<void> {
    console.log('=== Monitor de Criptomoedas ===');
    console.log('Moedas: bitcoin, ethereum, solana, cardano, dogecoin...\n');
    
    const coinInput = await this.inputHelper.question('Moeda para monitorar');
    
    if (coinInput && coinInput !== this.currentCoin) {
      try {
        await this.cryptoApi.getPrice(coinInput);
        this.currentCoin = coinInput;
        this.updateConfig();
        console.log(`Monitorando: ${this.currentCoin}`);
      } catch {
        console.log(`Moeda '${coinInput}' não encontrada. Usando: ${this.currentCoin}`);
      }
    }
  }

  private showMenu(): void {
    console.log('\nComandos: config | status | moeda | sair\n');
  }

  private createStrategy(): IAlertStrategy {
    const strategies = {
      'threshold': () => new ThresholdStrategy(this.config),
      'variation': () => new VariationStrategy(this.config)
    };
    
    return strategies[this.config.alertType]() || strategies['threshold']();
  }

  private updateConfig(): void {
    this.config.defaultCoin = this.currentCoin;
    this.currentStrategy = this.createStrategy();
  }

  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => this.monitorPrice(), 60000);
    this.monitorPrice();
  }

  private async monitorPrice(): Promise<void> {
    try {
      const price = await this.cryptoApi.getPrice(this.currentCoin);
      const time = new Date().toLocaleTimeString();
      
      console.log(`[${time}] ${this.currentCoin}: $${price.toFixed(2)}`);

      if (this.currentStrategy.shouldAlert(price)) {
        console.log(`${this.currentStrategy.getAlertMessage(price)}`);
        process.stdout.write('\x07');
      }
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  private async handleCommands(): Promise<void> {
    while (true) {
      const command = await this.inputHelper.question('> ');
      
      const commands = {
        'config': () => this.configureStrategy(),
        'status': () => this.showStatus(),
        'moeda': () => this.changeCoin(),
        'sair': () => { this.cleanup(); return false; }
      };

      const action = commands[command.toLowerCase() as keyof typeof commands];
      if (action && (await action()) === false) break;
      if (!action && command) console.log('Comando inválido!');
    }
  }

  private async configureStrategy(): Promise<void> {
    const strategies = ['Threshold (valores fixos)', 'Variation (variação %)'];
    const choice = await this.inputHelper.selectOption('Estratégias', strategies);
    
    if (choice === 0) await this.configureThreshold();
    else if (choice === 1) await this.configureVariation();
    else console.log('Opção inválida!');
  }

  private async configureThreshold(): Promise<void> {
    const buy = parseFloat(await this.inputHelper.question('Limite de compra (USD)'));
    const sell = parseFloat(await this.inputHelper.question('Limite de venda (USD)'));
    
    if (!isNaN(buy) && !isNaN(sell)) {
      this.config.buyThreshold = buy;
      this.config.sellThreshold = sell;
      this.config.alertType = 'threshold';
      this.currentStrategy = this.createStrategy();
      console.log('Configurado!');
    } else {
      console.log('Valores inválidos!');
    }
  }

  private async configureVariation(): Promise<void> {
    const variation = parseFloat(await this.inputHelper.question('Variação % para alerta'));
    const timeWindow = parseInt(await this.inputHelper.question('Janela de tempo (minutos)'));
    
    if (!isNaN(variation) && !isNaN(timeWindow)) {
      this.config.variationPercentage = variation;
      this.config.timeWindowMinutes = timeWindow;
      this.config.alertType = 'variation';
      this.currentStrategy = this.createStrategy();
      console.log('Configurado!');
    } else {
      console.log('Valores inválidos!');
    }
  }

  private async showStatus(): Promise<void> {
    try {
      const price = await this.cryptoApi.getPrice(this.currentCoin);
      console.log(`${this.currentCoin}: $${price.toFixed(2)}`);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  private async changeCoin(): Promise<void> {
    if (this.monitoringInterval) clearInterval(this.monitoringInterval);
    await this.setupCoin();
    this.startMonitoring();
  }

  private cleanup(): void {
    if (this.monitoringInterval) clearInterval(this.monitoringInterval);
    this.inputHelper.close();
    console.log('Encerrando...');
  }
}