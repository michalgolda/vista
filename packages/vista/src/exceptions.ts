export class DynamicComponentError extends Error {
  constructor() {
    super("DYNAMIC vista componensts are not supported yet.");
  }
}

export class ComponentTypeError extends Error {
  constructor() {
    super("Provided vista componenst type does not exists.");
  }
}
