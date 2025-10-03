
import { WriteCommand } from './command/writeCommand';
import { UserInputHelper } from './singleton/userInputHelper';
import { TextEditor } from './textEditor';
import { ICommand } from './types';

export class TextEditorApp {
  private editor: TextEditor;
  private inputHelper: UserInputHelper;
  private commandHistory: ICommand[] = [];

  constructor() {
    this.editor = new TextEditor();
    this.inputHelper = UserInputHelper.getInstance();
  }

  async run(): Promise<void> {
    console.log('=== EDITOR DE TEXTO ===\n');
    console.log('Comandos disponíveis:');
    console.log('- escrever <texto>');
    console.log('- desfazer');
    console.log('- listar');
    console.log('- sair\n');

    while (true) {
      const input = await this.inputHelper.question('Digite um comando');
      
      if (input.toLowerCase() === 'sair') {
        this.inputHelper.close();
        console.log('Encerrando editor...');
        break;
      }

      await this.processCommand(input);
    }
  }

  private async processCommand(input: string): Promise<void> {
    const parts = input.split(' ');
    const command = parts[0].toLowerCase();

    switch (command) {
      case 'escrever':
        const text = parts.slice(1).join(' ');
        if (text.trim()) {
          this.executeWriteCommand(text);
        } else {
          console.log('Por favor, forneça o texto a ser escrito.\n');
        }
        break;

      case 'desfazer':
        this.executeUndoCommand();
        break;

      case 'listar':
        this.listText();
        break;

      default:
        console.log('Comando inválido. Use: escrever <texto>, desfazer, listar ou sair.\n');
        break;
    }
  }

  private executeWriteCommand(text: string): void {
    const command = new WriteCommand(this.editor, text);
    command.execute();
    this.commandHistory.push(command);
    console.log('Texto adicionado.\n');
  }

  private executeUndoCommand(): void {
    if (this.commandHistory.length === 0) {
      console.log('Nenhuma operação para desfazer.\n');
      return;
    }

    const lastCommand = this.commandHistory.pop()!;
    lastCommand.undo();
    console.log('Última operação desfeita.\n');
  }

  private listText(): void {
    const lines = this.editor.getLines();
    
    if (lines.length === 0) {
      console.log('O texto está vazio.\n');
      return;
    }

    console.log('\n=== TEXTO ATUAL ===');
    lines.forEach((line, index) => {
      console.log(`${index + 1}: ${line}`);
    });
    console.log('==================\n');
  }
}