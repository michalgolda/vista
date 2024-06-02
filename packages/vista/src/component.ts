import {
  CentralComponent,
  ComponentType,
  IVistaComponent,
} from "./component.interface";

export class VistaComponent implements IVistaComponent {
  centralComponent: CentralComponent;
  props?: any;
  type: ComponentType;
  name: string;

  constructor(
    centralComponent: CentralComponent,
    name: string,
    props?: any,
    type: ComponentType = ComponentType.STATIC
  ) {
    this.centralComponent = centralComponent;
    this.props = props;
    this.type = type;
    this.name = name;
  }
}
