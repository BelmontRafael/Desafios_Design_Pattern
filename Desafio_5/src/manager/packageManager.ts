import { Package } from '../model/package';

export class PackageManager {
  private static instance: PackageManager;
  private packages: Map<string, Package> = new Map();

  private constructor() {}

  static getInstance(): PackageManager {
    if (!PackageManager.instance) {
      PackageManager.instance = new PackageManager();
    }
    return PackageManager.instance;
  }

  registerPackage(code: string): boolean {
    if (this.packages.has(code)) {
      return false;
    }

    const newPackage = new Package(code);
    this.packages.set(code, newPackage);
    return true;
  }

  getPackage(code: string): Package | undefined {
    return this.packages.get(code);
  }

  updateAllPackages(): void {
    this.packages.forEach(pkg => {
      pkg.update();
    });
  }
}