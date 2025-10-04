import { IPackageContext, IPackageState } from '../types';

export class DeliveredState implements IPackageState {
  getName(): string {
    return 'Entregue';
  }

  update(context: IPackageContext): void {
    context.incrementUpdateCount();
  }
}