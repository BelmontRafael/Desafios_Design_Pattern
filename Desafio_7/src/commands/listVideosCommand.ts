import { ICommand } from "./iCommand";
import { PlatformManager } from "../platformManager";

export class ListVideosCommand implements ICommand {
  constructor(private manager: PlatformManager) {}

  execute(): void {
    this.manager.listVideos();
  }
}