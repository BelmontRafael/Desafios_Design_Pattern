import * as readline from 'readline';

export class UserInputHelper {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(`${prompt}: `, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}