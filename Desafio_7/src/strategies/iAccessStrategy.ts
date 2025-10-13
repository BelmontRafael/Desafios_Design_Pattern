import { VideoAccessLevel } from "../models/video";

export interface IAccessStrategy {
  canAccess(videoLevel: VideoAccessLevel): boolean;
  getType(): string;
}