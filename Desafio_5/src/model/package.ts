import { RegisteredState } from "../states/registeredState";
import { IPackageContext, IPackageState } from "../types";


export class Package implements IPackageContext {
  private state: IPackageState;
  private updateCount: number = 0;

  constructor(private code: string) {
    this.state = new RegisteredState();
  }

  setState(state: IPackageState): void {
    this.state = state;
  }

  getCode(): string {
    return this.code;
  }

  getCurrentState(): IPackageState {
    return this.state;
  }

  incrementUpdateCount(): void {
    this.updateCount++;
  }

  getUpdateCount(): number {
    return this.updateCount;
  }

  update(): void {
    this.state.update(this);
  }
}