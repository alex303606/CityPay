export enum EShadow {
  S = 'Small',
  M = 'Medium',
  L = 'Large',
  XL = 'Extra Large',
}

export const ShadowsSizes: Record<EShadow, number> = {
  [EShadow.S]: 3,
  [EShadow.M]: 5,
  [EShadow.L]: 7,
  [EShadow.XL]: 12,
};
