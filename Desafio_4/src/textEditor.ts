import { TextMemento } from "./memento/textMemento";


export class TextEditor {
  private lines: string[] = [];

  addLine(line: string): void {
    this.lines.push(line);
  }

  removeLine(): void {
    this.lines.pop();
  }

  getLines(): string[] {
    return [...this.lines];
  }

  createMemento(): TextMemento {
    return new TextMemento(this.lines);
  }

  restoreFromMemento(memento: TextMemento): void {
    this.lines = memento.getState();
  }
}