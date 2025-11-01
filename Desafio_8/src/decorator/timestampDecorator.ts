import { IMessage } from '../interfaces/iMessage';
import { MessageDecorator } from './messageDecorator';

export class TimestampDecorator extends MessageDecorator {
  constructor(message: IMessage) {
    super(message);
  }

  getContent(): string {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    return `[${timestamp}] ${this.message.getContent()}`;
  }
}