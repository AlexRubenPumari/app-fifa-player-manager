export type AtLeastOne<Type> = {
  [K in keyof Type]-?: Required<Pick<Type, K>> & Partial<Omit<Type, K>>
}[keyof Type]