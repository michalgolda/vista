import { describe, it, expect } from "bun:test";
import { ComponentRepository } from "../component-repository";
import { VistaComponent } from "../component";

describe("ComponentRepository", () => {
  it("addComponent method", () => {
    const componentRepository = new ComponentRepository();

    expect(componentRepository.storage.length).toBe(0);

    const vistaComponent = new VistaComponent(() => null, "", null);
    componentRepository.addComponent(vistaComponent);

    expect(componentRepository.storage.length).toBe(1);
  });

  it("getComponents method", () => {
    const componentRepository = new ComponentRepository();

    expect(componentRepository.getComponents()).toStrictEqual([]);

    const vistaComponent = new VistaComponent(() => null, "", null);
    componentRepository.storage.push(vistaComponent);

    expect(componentRepository.getComponents()).toStrictEqual([vistaComponent]);
  });
});
