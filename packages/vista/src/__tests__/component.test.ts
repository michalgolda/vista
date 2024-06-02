import { describe, it, expect } from "bun:test";
import { VistaComponent } from "../component";
import { ComponentType } from "../component.interface";
import { DynamicComponentError } from "../exceptions";

describe("VistaComponent", () => {
  it("reject DYNAMIC component type", () => {
    const createVistaComponent = () => {
      new VistaComponent(() => null, "", ComponentType.DYNAMIC);
    };

    expect(createVistaComponent).toThrowError(DynamicComponentError);
  });
});
