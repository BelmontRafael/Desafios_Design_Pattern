import { ICommand } from "../interfaces/iCommand";

//Encerra o programa

export class ExitCommand implements ICommand {
  execute(): void {
    console.log("\nEncerrando o sistema de logs. Até logo!");
  }
}