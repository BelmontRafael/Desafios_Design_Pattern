import { ICommand } from "../interfaces/iCommand";
import { LoggerManager } from "../loggerManager";

//Exibe os logs registrados
export class ShowCommand implements ICommand {
  private manager: LoggerManager;

  constructor(manager: LoggerManager) {
    this.manager = manager;
  }

  execute(): void {
    this.manager.showLogs();
  }
}