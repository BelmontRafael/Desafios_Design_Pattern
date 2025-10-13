import { IVideo, RealVideo, VideoAccessLevel } from "../models/video";
import { User } from "../models/user";

//Controla o acesso aos vídeos baseado em permissões

export class VideoProxy implements IVideo {
  private realVideo: RealVideo | null = null;
  private title: string;
  private accessLevel: VideoAccessLevel;
  private currentUser: User | null;

  constructor(title: string, accessLevel: VideoAccessLevel, currentUser: User | null) {
    this.title = title;
    this.accessLevel = accessLevel;
    this.currentUser = currentUser;
  }


//Verifica se o usuário tem permissão para acessar o vídeo
  private hasAccess(): boolean {
    if (!this.currentUser) {
      return false;
    }

    if (this.accessLevel === VideoAccessLevel.FREE) {
      return true;
    }

    if (this.accessLevel === VideoAccessLevel.PREMIUM) {
      return this.currentUser.isPremium();
    }

    return false;
  }

  play(): void {
    console.log(`\nVerificando permissões para "${this.title}"...`);
    console.log(`Usuário: ${this.currentUser ? this.currentUser.toString() : "Não logado"}`);
    console.log(`Nível do vídeo: ${this.accessLevel}`);

    if (!this.currentUser) {
      console.log(`\nACESSO NEGADO: Você precisa fazer login primeiro!`);
      console.log(`Use: entrar <usuario>\n`);
      return;
    }

    if (!this.hasAccess()) {
      console.log(`\nACESSO NEGADO: Este vídeo é ${this.accessLevel}!`);
      console.log(`Usuários ${this.currentUser.type} não têm permissão para este conteúdo.`);
      console.log(`Faça upgrade para premium para acessar todos os vídeos!\n`);
      return;
    }

    console.log(`✅ ACESSO PERMITIDO!`);

    // Lazy loading: só cria o vídeo real se tiver permissão
    if (!this.realVideo) {
      this.realVideo = new RealVideo(this.title, this.accessLevel);
    }

    this.realVideo.play();
  }

  getTitle(): string {
    return this.title;
  }

  getAccessLevel(): VideoAccessLevel {
    return this.accessLevel;
  }
}