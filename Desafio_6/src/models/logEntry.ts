export class LogEntry {
  public readonly timestamp: Date;
  public readonly message: string;
  public readonly level: string;

  constructor(message: string, level: string = "INFO") {
    this.timestamp = new Date();
    this.message = message;
    this.level = level;
  }

  toString(): string {
    const dateStr = this.timestamp.toISOString().replace('T', ' ').substring(0, 19);
    return `[${dateStr}] [${this.level}] ${this.message}`;
  }
}