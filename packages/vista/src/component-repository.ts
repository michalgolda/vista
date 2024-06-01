import { IComponentRepository } from "./component-repository.interface";
import { IVistaComponent } from "./component.interface";

export class ComponentRepository implements IComponentRepository {
  private registry: IVistaComponent[] = [];

  addComponent(component: IVistaComponent): IComponentRepository {
    this.registry.push(component);
    return this;
  }

  getComponents(): IVistaComponent[] {
    return this.registry;
  }
}
