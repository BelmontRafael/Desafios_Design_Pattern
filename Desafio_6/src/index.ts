import * as readline from "readline";
import { LoggerManager } from "./loggerManager";
import { ConsoleLogObserver } from "./observers/consoleLogObserver";
import { ExitCommand } from "./commands/exitCommand";
import { ICommand } from "./interfaces/iCommand";
import { LogCommand } from "./commands/logCommand";
import { ShowCommand } from "./commands/showCommand";
import { ConsoleOutputStrategy } from "./strategies/consoleOutputStrategy";
import { FileOutputStrategy } from "./strategies/fileOutputStrategy";
import { DailySummaryStrategy } from "./strategies/dailySummaryStrategy";
import { ChangeOutputCommand } from "./commands/changeOutputCommand";


function main(): void {
  console.log("╔══════════════════════════════════════╗");
  console.log("║   SISTEMA DE REGISTRO DE EVENTOS     ║");
  console.log("╚══════════════════════════════════════╝");
  console.log();
  console.log("Comandos disponíveis:");
  console.log("  • log <mensagem>        - Registra um novo evento");
  console.log("  • mostrar               - Lista todos os eventos");
  console.log("  • modo <tipo>           - Altera saída (console/arquivo/resumo)");
  console.log("  • sair                  - Encerra o programa");
  console.log();

  const manager = new LoggerManager();
  
  // Observer Pattern: Anexa observador para notificações em tempo real
  const consoleObserver = new ConsoleLogObserver();
  manager.getSubject().attach(consoleObserver);

  console.log(`Modo atual: ${manager.getCurrentStrategyName()}`);
  console.log("─────────────────────────────────────────");
  console.log();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
  });

  rl.prompt();

  rl.on("line", (input: string) => {
    const command = parseCommand(input, manager);

    if (command) {
      command.execute();

      if (command instanceof ExitCommand) {
        rl.close();
        return;
      }
    }

    console.log();
    rl.prompt();
  });

  rl.on("close", () => {
    process.exit(0);
  });
}


//Parseia a entrada do usuário e cria o comando apropriado

function parseCommand(input: string, manager: LoggerManager): ICommand | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const parts = input.trim().split(/\s+/);
  const command = parts[0].toLowerCase();

  switch (command) {
    case "log":
      if (parts.length < 2) {
        console.log("✗ Erro: Use 'log <mensagem>' para registrar um evento.");
        return null;
      }
      const message = parts.slice(1).join(" ");
      return new LogCommand(manager, message);

    case "mostrar":
      return new ShowCommand(manager);

    case "sair":
      return new ExitCommand();

    case "modo":
      if (parts.length < 2) {
        console.log("✗ Erro: Use 'modo <console|arquivo|resumo>' para trocar o modo de saída.");
        return null;
      }
      return createChangeOutputCommand(parts[1].toLowerCase(), manager);

    default:
      console.log(`✗ Comando '${command}' não reconhecido.`);
      console.log("Comandos disponíveis: log, mostrar, modo, sair");
      return null;
  }
}

//Cria comando de mudança de estratégia

function createChangeOutputCommand(mode: string, manager: LoggerManager): ICommand | null {
  let strategy;

  switch (mode) {
    case "console":
      strategy = new ConsoleOutputStrategy();
      break;

    case "arquivo":
      strategy = new FileOutputStrategy();
      break;

    case "resumo":
      strategy = new DailySummaryStrategy();
      break;

    default:
      console.log(`✗ Modo '${mode}' não reconhecido. Use: console, arquivo ou resumo.`);
      return null;
  }

  return new ChangeOutputCommand(manager, strategy);
}

main();