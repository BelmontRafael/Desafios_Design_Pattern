import { ILogObserver } from "./interfaces/iLogObserver";
import { LogEntry } from "./models/logEntry";

//Observer Pattern: Subject que notifica observadores

export class LoggerSubject {
  private observers: ILogObserver[] = [];
  private logs: LogEntry[] = [];

  attach(observer: ILogObserver): void {
    this.observers.push(observer);
  }

  detach(observer: ILogObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(log: LogEntry): void {
    this.observers.forEach(observer => observer.update(log));
  }

  addLog(message: string, level: string = "INFO"): void {
    const log = new LogEntry(message, level);
    this.logs.push(log);
    this.notify(log);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogCount(): number {
    return this.logs.length;
  }
}