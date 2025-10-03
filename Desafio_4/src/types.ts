export interface IMemento {
  getState(): string[];
}

export interface ICommand {
  execute(): void;
  undo(): void;
}