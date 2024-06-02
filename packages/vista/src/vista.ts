import { Elysia } from "elysia";
import { IVista } from "./vista.interface";
import { IRenderer } from "./renderer.interface";
import { IComponentRepository } from "./component-repository.interface";
import { Renderer } from "./renderer";
import { ComponentType } from "./component.interface";
import { ComponentTypeError } from "./exceptions";

export class Vista implements IVista {
  renderer: IRenderer = new Renderer();
  private app: Elysia;
  public componentRepository: IComponentRepository;

  constructor(componentRepository: IComponentRepository) {
    this.componentRepository = componentRepository;
    this.app = new Elysia()
      .group("/render", (app) => {
        const availableComponents = this.componentRepository.getComponents();

        for (let component of availableComponents) {
          const name = component.name;

          app.get(
            `/${name}`,
            ({ query: componentProps }) => {
              let rendererResult = null;

              switch (component.type) {
                case ComponentType.STATIC:
                  rendererResult = this.renderer.renderStatic(
                    component,
                    componentProps
                  );
                  break;
                case ComponentType.DYNAMIC:
                  rendererResult = this.renderer.renderDynamic(
                    component,
                    componentProps
                  );
                  break;
                default:
                  throw new ComponentTypeError();
              }

              return {
                params: componentProps,
                markup: rendererResult,
              };
            },
            {
              query: component.props,
            }
          );
        }

        return app;
      })
      .get("/components", () => {
        const availableComponents = this.componentRepository
          .getComponents()
          .map((component) => {
            const name = component.name;

            return {
              name: name,
              endpoint: `/render/${name}`,
              type: component.type,
              props: component.props,
            };
          });

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
