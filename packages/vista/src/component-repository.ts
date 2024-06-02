import { IComponentRepository } from "./component-repository.interface";
import { IVistaComponent } from "./component.interface";

export class ComponentRepository implements IComponentRepository {
  storage: IVistaComponent[] = [];

  addComponent(component: IVistaComponent): IComponentRepository {
    this.storage.push(component);
    return this;
  }

  getComponents(): IVistaComponent[] {
    return this.storage;
  }
}
