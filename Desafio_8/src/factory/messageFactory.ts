import * as readline from 'readline';
import { IMessage } from '../interfaces/iMessage';
import { SimpleMessage } from '../simpleMessage';
import { PriorityDecorator } from '../decorator/priotityDecorator';
import { TimestampDecorator } from '../decorator/timestampDecorator';
import { UpperCaseDecorator } from '../decorator/upperCaseDecorator';


export class MessageFactory {
  private rl: readline.Interface;

  constructor(rl: readline.Interface) {
    this.rl = rl;
  }

  async createMessage(content: string): Promise<IMessage> {
    let message: IMessage = new SimpleMessage(content);

    const priority = await this.question('Adicionar prioridade? (s/n) ');
    const timestamp = await this.question('Aplicar timestamp? (s/n) ');
    const uppercase = await this.question('Transformar em maiúsculas? (s/n) ');

    // Aplicar decoradores na ordem correta
    if (priority.toLowerCase() === 's') {
      message = new PriorityDecorator(message);
    }

    if (timestamp.toLowerCase() === 's') {
      message = new TimestampDecorator(message);
    }

    if (uppercase.toLowerCase() === 's') {
      message = new UpperCaseDecorator(message);
    }

    return message;
  }

  private question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }
}