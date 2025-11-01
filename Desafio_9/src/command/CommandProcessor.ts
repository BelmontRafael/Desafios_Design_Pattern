import { FileSystemNavigator } from "../composite/FileSystemNavigator";
import { Folder } from "../composite/Folder";
import { File } from "../composite/File";

export class CommandProcessor {
  private navigator: FileSystemNavigator;

  constructor(navigator: FileSystemNavigator) {
    this.navigator = navigator;
  }

  process(input: string): boolean {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return true;
    }

    if (trimmedInput.toLowerCase() === 'sair') {
      return false;
    }

    if (trimmedInput.toLowerCase() === 'listar') {
      this.navigator.listCurrent();
      return true;
    }

    if (trimmedInput.toLowerCase() === 'voltar') {
      this.navigator.goBack();
      return true;
    }

    if (trimmedInput.toLowerCase().startsWith('criar arquivo ')) {
      const name = trimmedInput.substring(14).trim();
      if (name) {
        const file = new File(name);
        this.navigator.addComponent(file);
        console.log(`Arquivo "${name}" criado com sucesso.`);
      } else {
        console.log('Erro: Nome do arquivo não pode ser vazio.');
      }
      return true;
    }

    if (trimmedInput.toLowerCase().startsWith('criar pasta ')) {
      const name = trimmedInput.substring(12).trim();
      if (name) {
        const folder = new Folder(name);
        this.navigator.addComponent(folder);
        console.log(`Pasta "${name}" criada com sucesso.`);
      } else {
        console.log('Erro: Nome da pasta não pode ser vazio.');
      }
      return true;
    }

    if (trimmedInput.toLowerCase().startsWith('entrar ')) {
      const name = trimmedInput.substring(7).trim();
      if (name) {
        this.navigator.enterFolder(name);
      } else {
        console.log('Erro: Nome da pasta não pode ser vazio.');
      }
      return true;
    }

    console.log('Comando inválido! Comandos disponíveis:');
    console.log('  - criar arquivo <nome>');
    console.log('  - criar pasta <nome>');
    console.log('  - entrar <nome>');
    console.log('  - voltar');
    console.log('  - listar');
    console.log('  - sair');
    
    return true;
  }
}