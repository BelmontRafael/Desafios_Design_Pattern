import { IAccessStrategy } from "./iAccessStrategy";
import { VideoAccessLevel } from "../models/video";

export class NormalUserStrategy implements IAccessStrategy {
  canAccess(videoLevel: VideoAccessLevel): boolean {
    return videoLevel === VideoAccessLevel.FREE;
  }

  getType(): string {
    return "normal";
  }
}