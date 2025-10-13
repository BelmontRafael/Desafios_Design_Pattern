import { ILogOutputStrategy } from "./interfaces/iLogOutputStrategy";
import { LoggerSubject } from "./loggerSubject";
import { ConsoleOutputStrategy } from "./strategies/consoleOutputStrategy";

//Gerenciador central do sistema de logs
//Combina Subject (Observer) com Strategy Pattern

export class LoggerManager {
  private subject: LoggerSubject;
  private currentStrategy: ILogOutputStrategy;

  constructor() {
    this.subject = new LoggerSubject();
    this.currentStrategy = new ConsoleOutputStrategy();
  }

  getSubject(): LoggerSubject {
    return this.subject;
  }

  addLog(message: string, level: string = "INFO"): void {
    this.subject.addLog(message, level);
  }

  showLogs(): void {
    this.currentStrategy.output(this.subject.getLogs());
  }

  changeOutputStrategy(strategy: ILogOutputStrategy): void {
    this.currentStrategy = strategy;
    console.log(`Modo de saída alterado para: ${strategy.name}`);
  }

  getCurrentStrategyName(): string {
    return this.currentStrategy.name;
  }
}