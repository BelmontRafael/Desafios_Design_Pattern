export enum UserType {
  NORMAL = "normal",
  PREMIUM = "premium"
}

export class User {
  constructor(
    public readonly username: string,
    public readonly type: UserType
  ) {}

  isPremium(): boolean {
    return this.type === UserType.PREMIUM;
  }

  toString(): string {
    return `${this.username} (${this.type})`;
  }
}