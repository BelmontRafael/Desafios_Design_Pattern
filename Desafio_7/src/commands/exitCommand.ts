import { ICommand } from "./iCommand";

export class ExitCommand implements ICommand {
  execute(): void {
    console.log("\nEncerrando a plataforma. Até logo!");
  }
}