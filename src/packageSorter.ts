export type StackType = 'STANDARD' | 'SPECIAL' | 'REJECTED';

export function sort(width: number, height: number, length: number, mass: number): StackType {
  const isBulky = isBulkyPackage(width, height, length);
  const isHeavy = isHeavyPackage(mass);

  if (isBulky && isHeavy) {
    return 'REJECTED';
  }

  if (isBulky || isHeavy) {
    return 'SPECIAL';
  }

  return 'STANDARD';
}

function isBulkyPackage(width: number, height: number, length: number): boolean {
  const volume = width * height * length;
  const hasLargeVolume = volume >= 1_000_000;
  const hasLargeDimension = width >= 150 || height >= 150 || length >= 150;
  
  return hasLargeVolume || hasLargeDimension;
}

function isHeavyPackage(mass: number): boolean {
  return mass >= 20;
}
