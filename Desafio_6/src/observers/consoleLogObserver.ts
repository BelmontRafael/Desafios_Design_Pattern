import { ILogObserver } from "../interfaces/iLogObserver";
import { LogEntry } from "../models/logEntry";

export class ConsoleLogObserver implements ILogObserver {
  update(log: LogEntry): void {
    console.log(`✓ Log registrado: ${log.message}`);
  }
}