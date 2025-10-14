import { ICommand } from "./iCommand";
import { PlatformManager } from "../platformManager";

export class LogoutCommand implements ICommand {
  constructor(private manager: PlatformManager) {}

  execute(): void {
    this.manager.logout();
  }
}