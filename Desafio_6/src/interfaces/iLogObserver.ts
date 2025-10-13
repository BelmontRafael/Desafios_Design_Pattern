import { LogEntry } from "../models/logEntry";

export interface ILogObserver {
  update(log: LogEntry): void;
}