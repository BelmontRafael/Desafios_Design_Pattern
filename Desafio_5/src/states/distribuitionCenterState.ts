import { IPackageContext, IPackageState } from '../types';
import { DeliveredState } from './deliveredState';

export class DistributionCenterState implements IPackageState {
  getName(): string {
    return 'No centro de distribuição';
  }

  update(context: IPackageContext): void {
    context.incrementUpdateCount();
    
    if (context.getUpdateCount() >= 1) {
      context.setState(new DeliveredState());
    }
  }
}