import * as readline from 'readline';

export class UserInputHelper {
  private static instance: UserInputHelper;
  private rl: readline.Interface;

  private constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  static getInstance(): UserInputHelper {
    if (!UserInputHelper.instance) {
      UserInputHelper.instance = new UserInputHelper();
    }
    return UserInputHelper.instance;
  }

  question(prompt: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(`${prompt}: `, resolve);
    });
  }

  close(): void {
    this.rl.close();
  }
}