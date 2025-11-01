export abstract class FileSystemComponent {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  abstract display(indent: string): void;

  add(component: FileSystemComponent): void {
    throw new Error('Operação não suportada');
  }

  getChildren(): FileSystemComponent[] {
    throw new Error('Operação não suportada');
  }

  getChild(name: string): FileSystemComponent | null {
    throw new Error('Operação não suportada');
  }

  isComposite(): boolean {
    return false;
  }
}