import { ILogOutputStrategy } from "../interfaces/iLogOutputStrategy";
import { LogEntry } from "../models/logEntry";
import * as fs from "fs";

export class FileOutputStrategy implements ILogOutputStrategy {
  public readonly name: string = "Arquivo";
  private readonly filePath: string;

  constructor(filePath: string = "logs.txt") {
    this.filePath = filePath;
  }

  output(logs: LogEntry[]): void {
    try {
      let content = "=== LOGS DO SISTEMA ===\n";
      content += `Gerado em: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}\n\n`;
      
      logs.forEach(log => {
        content += log.toString() + "\n";
      });
      
      content += `\nTotal: ${logs.length} log(s)`;
      
      fs.writeFileSync(this.filePath, content, "utf-8");
      
      console.log(`\n✓ Logs salvos com sucesso em '${this.filePath}'`);
      console.log(`Total de ${logs.length} log(s) exportados.\n`);
    } catch (error) {
      console.log(`\n✗ Erro ao salvar arquivo: ${error}\n`);
    }
  }
}