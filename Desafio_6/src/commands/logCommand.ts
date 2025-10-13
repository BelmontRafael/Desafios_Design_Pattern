import { ICommand } from "../interfaces/iCommand";
import { LoggerManager } from "../loggerManager";

//Registra um novo log

export class LogCommand implements ICommand {
  private manager: LoggerManager;
  private message: string;

  constructor(manager: LoggerManager, message: string) {
    this.manager = manager;
    this.message = message;
  }

  execute(): void {
    this.manager.addLog(this.message);
  }
}