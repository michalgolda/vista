import { Elysia } from "elysia";
import {
  IVista,
  IVistaComponent,
  IVistaComponentRegistry,
  VistaComponentType,
  IVistaRenderer,
} from "./vista.interface";
import { FunctionComponent, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export class DynamicComponentError extends Error {
  constructor() {
    super("DYNAMIC vista componensts are not supported yet.");
  }
}

export class VistaComponent implements IVistaComponent {
  centralComponent: FunctionComponent<any>;
  props?: any;
  endpointName: string;
  type: VistaComponentType = VistaComponentType.STATIC;

  constructor(
    centralComponent: FunctionComponent<any>,
    endpointName: string,
    props?: any,
    type: VistaComponentType = VistaComponentType.STATIC
  ) {
    this.centralComponent = centralComponent;
    this.props = props;

    this.type = type;
    if (this.type === VistaComponentType.DYNAMIC) {
      throw new DynamicComponentError();
    }

    this.endpointName = endpointName;
  }
}

export class VistaComponentRegistry implements IVistaComponentRegistry {
  private registry: IVistaComponent[] = [];

  addComponent(component: IVistaComponent): IVistaComponentRegistry {
    this.registry.push(component);

    return this;
  }

  getComponents(): IVistaComponent[] {
    return this.registry;
  }
}

export class VistaRenderer implements IVistaRenderer {
  renderStatic(component: IVistaComponent, props?: any) {
    const element = createElement(component.centralComponent, props, null);
    const markup = renderToStaticMarkup(element, props);

    return markup;
  }

  renderDynamic(component: IVistaComponent, props?: any) {
    throw new DynamicComponentError();
  }
}

export class Vista implements IVista {
  renderer: VistaRenderer = new VistaRenderer();
  private app: Elysia;
  public componentRegistry: IVistaComponentRegistry;

  constructor(componentRegistry: IVistaComponentRegistry) {
    this.componentRegistry = componentRegistry;
    this.app = new Elysia()
      .group("/render", (app) => {
        const availableComponents = this.componentRegistry.getComponents();

        for (let component of availableComponents) {
          app.get(
            `/${component.endpointName}`,
            ({ query }) => {
              switch (component.type) {
                case VistaComponentType.STATIC:
                  return this.renderer.renderStatic(component, query);
                case VistaComponentType.DYNAMIC:
                  return this.renderer.renderDynamic(component, query);
              }
            },
            {
              query: component.props,
            }
          );
        }

        return app;
      })
      .get("/components", () => {
        const availableComponents = this.componentRegistry
          .getComponents()
          .map((component) => ({
            endpointName: component.endpointName,
            type: component.type,
          }));

        return availableComponents;
      });
  }

  listen(hostname: string = "localhost", port: number = 3000): void {
    this.app.listen({
      port,
      hostname,
    });
  }
}
