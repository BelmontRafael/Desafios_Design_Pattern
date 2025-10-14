import { ICommand } from "./iCommand";
import { PlatformManager } from "../platformManager";

export class LoginCommand implements ICommand {
  constructor(
    private manager: PlatformManager,
    private username: string
  ) {}

  execute(): void {
    this.manager.login(this.username);
  }
}