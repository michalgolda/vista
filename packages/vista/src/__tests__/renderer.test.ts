import { describe, it, expect, mock } from "bun:test";
import { Renderer } from "../renderer";
import { VistaComponent } from "../component";
import { DynamicComponentError } from "../exceptions";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

describe("Renderer", () => {
  it("renderStatic method", () => {
    const mockedCreateElement = mock(() => "element");
    const mockedRenderToStaticMarkup = mock(() => "markup");

    mock.module("react", () => ({
      createElement: mockedCreateElement,
    }));

    mock.module("react-dom/server", () => ({
      renderToStaticMarkup: mockedRenderToStaticMarkup,
    }));

    const vistaComponent = new VistaComponent(() => null, "", null);
    const renderer = new Renderer();

    const props = { test: "test" };

    expect(renderer.renderStatic(vistaComponent, props)).toBe("markup");

    expect(mockedCreateElement).toHaveBeenCalledWith(
      vistaComponent.centralComponent,
      props,
      null
    );

    expect(mockedRenderToStaticMarkup).toHaveBeenCalledWith("element", props);
  });

  it("renderDynamic method", () => {
    const renderer = new Renderer();
    const vistaComponent = new VistaComponent(() => null, "", null);

    const executeDynamicRenderMethod = () =>
      renderer.renderDynamic(vistaComponent);

    expect(executeDynamicRenderMethod).toThrowError(DynamicComponentError);
  });
});
