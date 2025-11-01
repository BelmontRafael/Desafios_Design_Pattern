import { IMessage } from './interfaces/iMessage';

export class SimpleMessage implements IMessage {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }
}