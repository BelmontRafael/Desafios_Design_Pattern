import { ICommand } from "./iCommand";
import { PlatformManager } from "../platformManager";

export class WatchVideoCommand implements ICommand {
  constructor(
    private manager: PlatformManager,
    private videoId: string
  ) {}

  execute(): void {
    this.manager.watchVideo(this.videoId);
  }
}