import { IVistaComponent } from "./component.interface";

export interface IRenderer {
  renderStatic(component: IVistaComponent, props?: any): any;
  renderDynamic(component: IVistaComponent, props?: any): any;
}
