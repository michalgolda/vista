import { FunctionComponent } from "react";
import { Vista, VistaRenderer } from "./vista";

export interface IVista {
  renderer: VistaRenderer;
  componentRegistry: IVistaComponentRegistry;
  listen(hostname: string, port: number): void;
}

export enum VistaComponentType {
  STATIC = "STATIC",
  DYNAMIC = "DYNAMIC",
}

export interface IVistaComponent {
  readonly props?: any;
  readonly type: VistaComponentType;
  readonly endpointName: string;
  readonly centralComponent: FunctionComponent<any>;
}

export interface IVistaRenderer {
  renderStatic(component: IVistaComponent, props?: any): any;
  renderDynamic(component: IVistaComponent, props?: any): any;
}

export type OnUpdateFunction = (component: IVistaComponent) => void;

export interface IVistaComponentRegistry {
  addComponent(component: IVistaComponent): IVistaComponentRegistry;
  getComponents(): IVistaComponent[];
}
