import { User, UserType } from "./models/user";
import { VideoLibrary } from "./videoLibrary";
import { VideoProxy } from "./proxy/videoProxy";

export class PlatformManager {
  private currentUser: User | null = null;
  private videoLibrary: VideoLibrary;
  private registeredUsers: Map<string, User>;

  constructor() {
    this.videoLibrary = new VideoLibrary();
    this.registeredUsers = new Map();
    this.initializeUsers();
  }

  private initializeUsers(): void {
    this.registeredUsers.set("joao", new User("joao", UserType.NORMAL));
    this.registeredUsers.set("maria", new User("maria", UserType.PREMIUM));
    this.registeredUsers.set("pedro", new User("pedro", UserType.NORMAL));
    this.registeredUsers.set("ana", new User("ana", UserType.PREMIUM));
  }

  login(username: string): void {
    const user = this.registeredUsers.get(username.toLowerCase());
    
    if (!user) {
      console.log(`\nUsuário "${username}" não encontrado!`);
      console.log(`Usuários disponíveis: ${Array.from(this.registeredUsers.keys()).join(", ")}\n`);
      return;
    }

    this.currentUser = user;
    console.log(`\nLogin realizado com sucesso!`);
    console.log(`Bem-vindo(a), ${user.username}!`);
    console.log(`Tipo de conta: ${user.type.toUpperCase()}`);
    
    if (user.isPremium()) {
      console.log(`Você tem acesso a TODOS os vídeos!\n`);
    } else {
      console.log(`Você tem acesso apenas aos vídeos gratuitos.\n`);
    }
  }

  watchVideo(videoId: string): void {
    if (!this.videoLibrary.hasVideo(videoId)) {
      console.log(`\nVídeo "${videoId}" não encontrado!`);
      console.log(`Use o comando "listar" para ver os vídeos disponíveis.\n`);
      return;
    }

    const videoInfo = this.videoLibrary.getVideo(videoId)!;
    
    //Cria proxy que verifica permissões
    const videoProxy = new VideoProxy(
      videoInfo.title,
      videoInfo.accessLevel,
      this.currentUser
    );

    videoProxy.play();
  }

  listVideos(): void {
    this.videoLibrary.listVideos();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    if (this.currentUser) {
      console.log(`\nAté logo, ${this.currentUser.username}!\n`);
      this.currentUser = null;
    } else {
      console.log(`\nVocê não está logado.\n`);
    }
  }
}