import { ILogOutputStrategy } from "../interfaces/iLogOutputStrategy";
import { LogEntry } from "../models/logEntry";

export class ConsoleOutputStrategy implements ILogOutputStrategy {
  public readonly name: string = "Console";

  output(logs: LogEntry[]): void {
    console.log("\n=== LOGS DO SISTEMA ===");
    
    if (logs.length === 0) {
      console.log("Nenhum log registrado ainda.");
    } else {
      logs.forEach(log => console.log(log.toString()));
    }
    
    console.log(`Total: ${logs.length} log(s)\n`);
  }
}