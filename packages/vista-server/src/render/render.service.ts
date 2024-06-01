import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export default {
  render: (componentName: string) => {
    const component = require("vista-components")[componentName];
    const element = createElement(component, {
      name: "michal",
    });
    const html = renderToStaticMarkup(element);

    return html;
  },
};
