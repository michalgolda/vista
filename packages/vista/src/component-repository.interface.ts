import { IVistaComponent } from "./component.interface";

export interface IComponentRepository {
  addComponent(component: IVistaComponent): IComponentRepository;
  getComponents(): IVistaComponent[];
}
