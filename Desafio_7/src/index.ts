import * as readline from "readline";
import { PlatformManager } from "./platformManager";
import { ExitCommand } from "./commands/exitCommand";
import { ICommand } from "./commands/iCommand";
import { LoginCommand } from "./commands/loginCommand";
import { WatchVideoCommand } from "./commands/watchVideoCommand";
import { ListVideosCommand } from "./commands/listVideosCommand";
import { LogoutCommand } from "./commands/logoutCommand";

function main(): void {
  console.log("╔═══════════════════════════════════════════╗");
  console.log("║   PLATAFORMA DE VÍDEOS EDUCATIVOS         ║");
  console.log("╚═══════════════════════════════════════════╝");
  console.log();
  console.log("Comandos disponíveis:");
  console.log("  • entrar <usuario>      - Fazer login");
  console.log("  • assistir <video>      - Assistir a um vídeo");
  console.log("  • listar                - Listar vídeos disponíveis");
  console.log("  • sair-conta            - Fazer logout");
  console.log("  • sair                  - Encerrar programa");
  console.log();
  console.log("Usuários disponíveis: joao, maria, pedro, ana");
  console.log("   (joao e pedro = normal | maria e ana = premium)");
  console.log("─────────────────────────────────────────────");
  console.log();

  const manager = new PlatformManager();

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

function parseCommand(input: string, manager: PlatformManager): ICommand | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const parts = input.trim().split(/\s+/);
  const command = parts[0].toLowerCase();

  switch (command) {
    case "entrar":
      if (parts.length < 2) {
        console.log("\nErro: Use 'entrar <usuario>' para fazer login.\n");
        return null;
      }
      return new LoginCommand(manager, parts[1]);

    case "assistir":
      if (parts.length < 2) {
        console.log("\nErro: Use 'assistir <video>' para assistir a um vídeo.\n");
        return null;
      }
      return new WatchVideoCommand(manager, parts[1]);

    case "listar":
      return new ListVideosCommand(manager);

    case "sair-conta":
      return new LogoutCommand(manager);

    case "sair":
      return new ExitCommand();

    default:
      console.log(`\nComando '${command}' não reconhecido.`);
      console.log("Comandos disponíveis: entrar, assistir, listar, sair-conta, sair\n");
      return null;
  }
}

main();