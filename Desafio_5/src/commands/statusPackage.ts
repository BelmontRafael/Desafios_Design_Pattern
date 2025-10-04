import { ICommand } from '../types';
import { PackageManager } from '../manager/packageManager';


export class StatusPackageCommand implements ICommand {
  constructor(
    private packageManager: PackageManager,
    private code: string
  ) {}

  execute(): void {
    const pkg = this.packageManager.getPackage(this.code);
    
    if (pkg) {
      console.log(`Pacote ${this.code}: ${pkg.getCurrentState().getName()}\n`);
    } else {
      console.log(`Erro: Pacote ${this.code} não encontrado!\n`);
    }
  }
}