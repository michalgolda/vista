import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IRenderer } from "./renderer.interface";
import { IVistaComponent } from "./component.interface";
import { DynamicComponentError } from "./exceptions";

export class Renderer implements IRenderer {
  renderStatic(component: IVistaComponent, props?: any) {
    const element = createElement(component.centralComponent, props, null);
    const markup = renderToStaticMarkup(element, props);

    return markup;
  }

  renderDynamic(component: IVistaComponent, props?: any) {
    throw new DynamicComponentError();
  }
}
