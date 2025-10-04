import { ICommand } from './types';
import { PackageManager } from './manager/packageManager';
import { UserInputHelper } from './userInputHelper';
import { RegisterPackageCommand } from './commands/registerPackage';
import { StatusPackageCommand } from './commands/statusPackage';


export class LogisticsApp {
  private packageManager: PackageManager;
  private inputHelper: UserInputHelper;

  constructor() {
    this.packageManager = PackageManager.getInstance();
    this.inputHelper = new UserInputHelper();
  }

  async run(): Promise<void> {
    console.log('=== SISTEMA DE LOGÍSTICA ===\n');
    console.log('Comandos disponíveis:');
    console.log('- registrar <codigo>: Registra um novo pacote');
    console.log('- status <codigo>: Consulta o status de um pacote');
    console.log('- sair: Encerra o programa\n');

    while (true) {
      this.packageManager.updateAllPackages();

      const input = await this.inputHelper.question('Digite um comando');
      
      if (input.toLowerCase() === 'sair') {
        this.inputHelper.close();
        console.log('Encerrando...');
        break;
      }

      const command = this.parseCommand(input);
      if (command) {
        command.execute();
      } else {
        console.log('Comando inválido! Use: registrar <codigo>, status <codigo> ou sair\n');
      }
    }
  }

  private parseCommand(input: string): ICommand | null {
    const parts = input.trim().split(' ');
    const action = parts[0].toLowerCase();
    const code = parts[1];

    switch (action) {
      case 'registrar':
        if (!code) {
          console.log('Erro: Código do pacote não informado!\n');
          return null;
        }
        return new RegisterPackageCommand(this.packageManager, code);

      case 'status':
        if (!code) {
          console.log('Erro: Código do pacote não informado!\n');
          return null;
        }
        return new StatusPackageCommand(this.packageManager, code);

      default:
        return null;
    }
  }
}