import { IMessage } from '../interfaces/iMessage';
import { MessageDecorator } from './messageDecorator';

export class PriorityDecorator extends MessageDecorator {
  constructor(message: IMessage) {
    super(message);
  }

  getContent(): string {
    return `[PRIORIDADE] ${this.message.getContent()}`;
  }
}