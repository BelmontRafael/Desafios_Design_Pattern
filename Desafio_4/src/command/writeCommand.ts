import { ICommand } from '../types';
import { TextEditor } from '../textEditor';

export class WriteCommand implements ICommand {
  private editor: TextEditor;
  private text: string;

  constructor(editor: TextEditor, text: string) {
    this.editor = editor;
    this.text = text;
  }

  execute(): void {
    this.editor.addLine(this.text);
  }

  undo(): void {
    this.editor.removeLine();
  }
}