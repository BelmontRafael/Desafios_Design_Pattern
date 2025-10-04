import { IPackageContext, IPackageState } from '../types';
import { InTransitState } from './inTransitState';


export class RegisteredState implements IPackageState {
  getName(): string {
    return 'Registrado';
  }

  update(context: IPackageContext): void {
    context.setState(new InTransitState());
    context.incrementUpdateCount();
  }
}