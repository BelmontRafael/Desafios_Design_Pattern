import { IAccessStrategy } from "./iAccessStrategy";
import { VideoAccessLevel } from "../models/video";

export class PremiumUserStrategy implements IAccessStrategy {
  canAccess(videoLevel: VideoAccessLevel): boolean {
    return true;
  }

  getType(): string {
    return "premium";
  }
}