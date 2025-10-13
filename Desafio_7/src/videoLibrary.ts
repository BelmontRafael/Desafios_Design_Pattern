import { VideoAccessLevel } from "./models/video";

export interface VideoInfo {
  title: string;
  accessLevel: VideoAccessLevel;
}

export class VideoLibrary {
  private videos: Map<string, VideoInfo> = new Map();

  constructor() {
    this.initializeVideos();
  }

  private initializeVideos(): void {
    this.addVideo("introducao-programacao", "Introdução à Programação", VideoAccessLevel.FREE);
    this.addVideo("html-basico", "HTML Básico", VideoAccessLevel.FREE);
    this.addVideo("git-github", "Git e GitHub para Iniciantes", VideoAccessLevel.FREE);
    
    this.addVideo("design-patterns", "Design Patterns Avançados", VideoAccessLevel.PREMIUM);
    this.addVideo("typescript-avancado", "TypeScript Avançado", VideoAccessLevel.PREMIUM);
    this.addVideo("arquitetura-software", "Arquitetura de Software", VideoAccessLevel.PREMIUM);
    this.addVideo("microserviços", "Microserviços na Prática", VideoAccessLevel.PREMIUM);
  }

  private addVideo(id: string, title: string, accessLevel: VideoAccessLevel): void {
    this.videos.set(id, { title, accessLevel });
  }

  getVideo(id: string): VideoInfo | undefined {
    return this.videos.get(id);
  }

  listVideos(): void {
    console.log("\nCATÁLOGO DE VÍDEOS DISPONÍVEIS:\n");
    
    console.log("Vídeos Gratuitos:");
    this.videos.forEach((video, id) => {
      if (video.accessLevel === VideoAccessLevel.FREE) {
        console.log(`   • ${id} - ${video.title}`);
      }
    });
    
    console.log("\nVídeos Premium:");
    this.videos.forEach((video, id) => {
      if (video.accessLevel === VideoAccessLevel.PREMIUM) {
        console.log(`   • ${id} - ${video.title}`);
      }
    });
    console.log();
  }

  hasVideo(id: string): boolean {
    return this.videos.has(id);
  }
}