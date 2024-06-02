import {
  FunctionComponent as ReactFunctionComponent,
  ComponentClass as ReactComponent,
} from "react";

export enum ComponentType {
  STATIC = "STATIC",
  DYNAMIC = "DYNAMIC",
}

export type CentralComponent =
  | ReactFunctionComponent<any>
  | ReactComponent<any>;

export interface IVistaComponent {
  readonly props?: any;
  readonly type: ComponentType;
  readonly name: string;
  readonly centralComponent: CentralComponent;
  getCentralComponentName(): string;
}
