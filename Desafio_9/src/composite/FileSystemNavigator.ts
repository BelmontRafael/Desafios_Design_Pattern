import { Folder } from './Folder';
import { FileSystemComponent } from './FileSystemComponent';

export class FileSystemNavigator {
  private root: Folder;
  private currentFolder: Folder;
  private pathStack: Folder[] = [];

  constructor() {
    this.root = new Folder('root');
    this.currentFolder = this.root;
    this.pathStack.push(this.root);
  }

  getCurrentFolder(): Folder {
    return this.currentFolder;
  }

  getCurrentPath(): string {
    return this.pathStack.map(folder => folder.getName()).join('/');
  }

  enterFolder(name: string): boolean {
    const child = this.currentFolder.getChild(name);

    if (!child) {
      console.log(`Erro: Pasta "${name}" não encontrada.`);
      return false;
    }

    if (!child.isComposite()) {
      console.log(`Erro: "${name}" não é uma pasta.`);
      return false;
    }

    this.currentFolder = child as Folder;
    this.pathStack.push(this.currentFolder);
    return true;
  }

  goBack(): boolean {
    if (this.pathStack.length <= 1) {
      console.log('Erro: Você já está na pasta raiz.');
      return false;
    }

    this.pathStack.pop();
    this.currentFolder = this.pathStack[this.pathStack.length - 1];
    return true;
  }

  addComponent(component: FileSystemComponent): void {
    if (this.currentFolder.getChild(component.getName())) {
      console.log(`Erro: Já existe um item chamado "${component.getName()}" nesta pasta.`);
      return;
    }

    this.currentFolder.add(component);
  }

  listCurrent(): void {
    console.log(`\n Conteúdo de ${this.getCurrentPath()}:\n`);
    
    const children = this.currentFolder.getChildren();
    
    if (children.length === 0) {
      console.log('  (vazio)');
    } else {
      for (const child of children) {
        child.display('  ');
      }
    }
    console.log();
  }
}