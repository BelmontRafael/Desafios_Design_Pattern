import { IMessage } from '../interfaces/iMessage';

export abstract class MessageDecorator implements IMessage {
  protected message: IMessage;

  constructor(message: IMessage) {
    this.message = message;
  }

  getContent(): string {
    return this.message.getContent();
  }
}