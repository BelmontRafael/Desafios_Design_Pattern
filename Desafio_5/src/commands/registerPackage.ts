import { ICommand } from '../types';
import { PackageManager } from '../manager/packageManager';

export class RegisterPackageCommand implements ICommand {
  constructor(
    private packageManager: PackageManager,
    private code: string
  ) {}

  execute(): void {
    const success = this.packageManager.registerPackage(this.code);
    
    if (success) {
      console.log(`Pacote ${this.code} registrado com sucesso!\n`);
    } else {
      console.log(`Erro: Pacote ${this.code} já existe!\n`);
    }
  }
}