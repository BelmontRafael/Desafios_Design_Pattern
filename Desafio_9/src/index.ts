import * as readline from 'readline';
import { FileSystemNavigator } from './composite/FileSystemNavigator';
import { CommandProcessor } from './command/CommandProcessor';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const navigator = new FileSystemNavigator();
const processor = new CommandProcessor(navigator);

console.log('=== Sistema de Arquivos Simples ===');
console.log('Comandos disponíveis:');
console.log('  - criar arquivo <nome>');
console.log('  - criar pasta <nome>');
console.log('  - entrar <nome>');
console.log('  - voltar');
console.log('  - listar');
console.log('  - sair\n');

const processCommand = () => {
  const currentPath = navigator.getCurrentPath();
  rl.question(`${currentPath}> `, (input) => {
    const shouldContinue = processor.process(input);

    if (shouldContinue) {
      processCommand();
    } else {
      console.log('Encerrando o sistema...');
      rl.close();
    }
  });
};

processCommand();