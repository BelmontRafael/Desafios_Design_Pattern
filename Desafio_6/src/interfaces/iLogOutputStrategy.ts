import { LogEntry } from "../models/logEntry";

export interface ILogOutputStrategy {
  readonly name: string;
  output(logs: LogEntry[]): void;
}