import { FileSystemComponent } from './FileSystemComponent';

export class Folder extends FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(name: string) {
    super(name);
  }

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  getChildren(): FileSystemComponent[] {
    return this.children;
  }

  getChild(name: string): FileSystemComponent | null {
    return this.children.find(child => child.getName() === name) || null;
  }

  display(indent: string = ''): void {
    console.log(`${indent} ${this.name}/`);
    
    for (const child of this.children) {
      child.display(indent + '  ');
    }
  }

  isComposite(): boolean {
    return true;
  }
}