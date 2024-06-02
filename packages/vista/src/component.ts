import {
  CentralComponent,
  ComponentType,
  IVistaComponent,
} from "./component.interface";
import { DynamicComponentError } from "./exceptions";

export class VistaComponent implements IVistaComponent {
  centralComponent: CentralComponent;
  props?: any;
  type: ComponentType;
  name: string;

  constructor(
    centralComponent: CentralComponent,
    props?: any,
    type: ComponentType = ComponentType.STATIC
  ) {
    this.centralComponent = centralComponent;
    this.props = props;

    this.type = type;
    if (this.type === ComponentType.DYNAMIC) {
      throw new DynamicComponentError();
    }

    this.name = this.getCentralComponentName();
  }

  getCentralComponentName(): string {
    return this.centralComponent.name.toLowerCase();
  }
}
