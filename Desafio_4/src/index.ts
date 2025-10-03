import { TextEditorApp } from './textEditorApp';

async function main() {
  try {
    const app = new TextEditorApp();
    await app.run();
  } catch (error) {
    console.error('Erro fatal:', error);
  }
}

main();