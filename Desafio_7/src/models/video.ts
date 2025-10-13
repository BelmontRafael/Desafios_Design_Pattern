export enum VideoAccessLevel {
  FREE = "gratuito",
  PREMIUM = "premium"
}

export interface IVideo {
  play(): void;
  getTitle(): string;
  getAccessLevel(): VideoAccessLevel;
}

//Só é carregado se o usuário tiver permissão

export class RealVideo implements IVideo {
  private title: string;
  private accessLevel: VideoAccessLevel;
  private loaded: boolean = false;

  constructor(title: string, accessLevel: VideoAccessLevel) {
    this.title = title;
    this.accessLevel = accessLevel;
  }

//Simula o carregamento pesado do vídeo

  private load(): void {
    if (!this.loaded) {
      console.log(`Carregando vídeo "${this.title}"...`);
      console.log(`Baixando conteúdo...`);
      console.log(`Vídeo carregado com sucesso!`);
      this.loaded = true;
    }
  }

  play(): void {
    this.load(); // Lazy loading
    console.log(`\nReproduzindo: "${this.title}"`);
    console.log(`[════════════════════] 100%`);
    console.log(`Vídeo finalizado!\n`);
  }

  getTitle(): string {
    return this.title;
  }

  getAccessLevel(): VideoAccessLevel {
    return this.accessLevel;
  }
}