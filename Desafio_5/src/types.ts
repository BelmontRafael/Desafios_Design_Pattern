export interface IPackageState {
  getName(): string;
  update(context: IPackageContext): void;
}

export interface IPackageContext {
  setState(state: IPackageState): void;
  getCode(): string;
  incrementUpdateCount(): void;
  getUpdateCount(): number;
}