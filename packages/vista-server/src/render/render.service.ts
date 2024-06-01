import { FunctionComponent, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export default new (class {
  public render(componentName: string, props: any) {
    const element = this.getElement(componentName, props);
    const markup = renderToStaticMarkup(element);

    return markup;
  }

  private getElement(componentName: string, props: any) {
    const component = this.importComponent(componentName);
    const element = createElement(component, props, null);

    return element;
  }

  private importComponent(componentName: string): FunctionComponent<any> {
    return require("vista-components")[componentName];
  }
})();
