import { IPackageContext, IPackageState } from '../types';
import { DistributionCenterState } from './distribuitionCenterState';

export class InTransitState implements IPackageState {
  getName(): string {
    return 'Em trânsito';
  }

  update(context: IPackageContext): void {
    context.incrementUpdateCount();
    
    if (context.getUpdateCount() >= 2) {
      context.setState(new DistributionCenterState());
    }
  }
}