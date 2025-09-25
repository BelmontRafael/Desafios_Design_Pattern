import { SupportedFormat } from '../types';

export interface ParsedArguments {
  input: string;
  format: SupportedFormat;
}

export class ArgumentParser {
  static parse(args: string[]): ParsedArguments {
    const inputIndex = args.findIndex(arg => arg === '--input');
    const formatArg = args.find(arg => arg.startsWith('--format='));

    if (inputIndex === -1 || !formatArg) {
      throw new Error('Uso: node app.js --input <arquivo> --format=<csv|json|xml>');
    }

    const input = args[inputIndex + 1];
    const format = formatArg.split('=')[1] as SupportedFormat;

    if (!input) {
      throw new Error('Caminho do arquivo não especificado');
    }

    if (!['csv', 'json', 'xml'].includes(format)) {
      throw new Error('Formato deve ser: csv, json ou xml');
    }

    return { input, format };
  }
}