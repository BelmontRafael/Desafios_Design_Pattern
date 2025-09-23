import * as readline from 'readline';

export class UserInputHelper {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async question(prompt: string, defaultValue?: string): Promise<string> {
    return new Promise((resolve) => {
      const fullPrompt = defaultValue ? `${prompt} [${defaultValue}]: ` : `${prompt}: `;
      this.rl.question(fullPrompt, (answer) => {
        resolve(answer.trim() || defaultValue || '');
      });
    });
  }

  async selectOption(title: string, options: string[]): Promise<number> {
    console.log(`\n=== ${title} ===`);
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    const choice = await this.question('Escolha uma opção');
    const index = parseInt(choice) - 1;
    
    return (index >= 0 && index < options.length) ? index : -1;
  }

  close(): void {
    this.rl.close();
  }
}