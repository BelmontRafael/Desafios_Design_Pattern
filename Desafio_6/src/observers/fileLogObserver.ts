import { ILogObserver } from "../interfaces/iLogObserver";
import { LogEntry } from "../models/logEntry";
import * as fs from "fs";

export class FileLogObserver implements ILogObserver {
  private readonly filePath: string;

  constructor(filePath: string = "logs-realtime.txt") {
    this.filePath = filePath;
  }

  update(log: LogEntry): void {
    try {
      const content = log.toString() + "\n";
      fs.appendFileSync(this.filePath, content, "utf-8");
    } catch (error) {
      console.error(`Erro ao salvar log em tempo real: ${error}`);
    }
  }
}