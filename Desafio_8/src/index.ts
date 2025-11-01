import * as readline from 'readline';
import { MessageFactory } from './factory/messageFactory';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const factory = new MessageFactory(rl);

console.log('=== Sistema de Envio de Mensagens ===');
console.log('Digite "enviar <mensagem>" ou "sair" para encerrar\n');

const processCommand = () => {
  rl.question('> ', async (input) => {
    const trimmedInput = input.trim();

    if (trimmedInput.toLowerCase() === 'sair') {
      console.log('Encerrando o sistema...');
      rl.close();
      return;
    }

    if (trimmedInput.toLowerCase().startsWith('enviar ')) {
      const messageContent = trimmedInput
        .substring(7)
        .trim()
        .replace(/^["']|["']$/g, '');

      if (!messageContent) {
        console.log('Erro: Mensagem vazia!\n');
        processCommand();
        return;
      }

      const message = await factory.createMessage(messageContent);
      console.log(`\nMensagem final: ${message.getContent()}\n`);
      processCommand();
    } else {
      console.log('Comando inválido! Use: enviar <mensagem>\n');
      processCommand();
    }
  });
};

processCommand();