import { IMessage } from '../interfaces/iMessage';
import { MessageDecorator } from './messageDecorator';

export class UpperCaseDecorator extends MessageDecorator {
  constructor(message: IMessage) {
    super(message);
  }

  getContent(): string {
    return this.message.getContent().toUpperCase();
  }
}