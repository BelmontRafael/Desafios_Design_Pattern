import { IMemento } from '../types';

export class TextMemento implements IMemento {
  private state: string[];

  constructor(state: string[]) {
    this.state = [...state];
  }

  getState(): string[] {
    return [...this.state];
  }
}