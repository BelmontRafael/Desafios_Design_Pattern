import { ICommand } from "../interfaces/iCommand";
import { LoggerManager } from "../loggerManager";
import { ILogOutputStrategy } from "../interfaces/iLogOutputStrategy";

//Altera a estratégia de saída

export class ChangeOutputCommand implements ICommand {
  private manager: LoggerManager;
  private strategy: ILogOutputStrategy;

  constructor(manager: LoggerManager, strategy: ILogOutputStrategy) {
    this.manager = manager;
    this.strategy = strategy;
  }

  execute(): void {
    this.manager.changeOutputStrategy(this.strategy);
  }
}