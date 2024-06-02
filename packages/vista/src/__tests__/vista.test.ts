import { describe, it, expect, mock, spyOn, jest } from "bun:test";
import { Elysia } from "elysia";
import { Vista } from "../vista";
import { ComponentRepository } from "../component-repository";
import { VistaComponent } from "../component";
import { ComponentType } from "../component.interface";

describe("Vista", () => {
  it("listen method", () => {
    const mockedListen = mock();

    mock.module("elysia", () => ({
      Elysia: function () {
        return {
          listen: mockedListen,
          get: function () {
            return this;
          },
          group: function () {
            return this;
          },
        };
      },
    }));

    const componentRepository = new ComponentRepository();
    const vista = new Vista(componentRepository);

    vista.listen("localhost", 3000);

    expect(mockedListen).toHaveBeenCalledWith({
      hostname: "localhost",
      port: 3000,
    });
  });

  it("availableComponentsController method", () => {
    mock.module("elysia", () => ({
      Elysia: function () {
        return {
          get: function () {
            return this;
          },
          group: function () {
            return this;
          },
        };
      },
    }));

    const vistaComponent = new VistaComponent(() => null, "test", null);
    const componentRepository = new ComponentRepository().addComponent(
      vistaComponent
    );

    const vista = new Vista(componentRepository);

    expect(vista.availableComponentsController()).toStrictEqual([
      {
        name: "test",
        props: null,
        type: ComponentType.STATIC,
        endpoint: "/render/test",
      },
    ]);
  });

  it("renderComponentController method", () => {
    mock.module("elysia", () => ({
      Elysia: function () {
        return {
          get: function () {
            return this;
          },
          group: function () {
            return this;
          },
        };
      },
    }));

    const mockedRenderStatic = mock(() => "renderStaticMarkup");
    const mockedRenderDynamic = mock(() => "renderDynamicMarkup");

    mock.module("../renderer", () => ({
      Renderer: function () {
        return {
          renderStatic: mockedRenderStatic,
          renderDynamic: mockedRenderDynamic,
        };
      },
    }));

    const staticVistaComponent = new VistaComponent(() => null, "test", null);
    const componentRepository = new ComponentRepository();

    const vista = new Vista(componentRepository);

    expect(
      vista.renderComponentController(null, staticVistaComponent)
    ).toStrictEqual({
      params: null,
      markup: "renderStaticMarkup",
    });

    const dynamicVistaComponent = new VistaComponent(
      () => null,
      "test",
      null,
      ComponentType.DYNAMIC
    );

    expect(
      vista.renderComponentController(null, dynamicVistaComponent)
    ).toStrictEqual({
      params: null,
      markup: "renderDynamicMarkup",
    });
  });

  it("renderComponentControllerFactory method", () => {
    const vistaComponent = new VistaComponent(() => null, "test", null);
    const componentRepository = new ComponentRepository().addComponent(
      vistaComponent
    );

    const renderComponentControllerSpyOn = spyOn(
      Vista.prototype,
      "renderComponentController"
    );

    const vista = new Vista(componentRepository);

    const app = new Elysia();

    const mockedQuery = mock();

    // @ts-ignore
    app.get = (_, callback: any) => {
      callback({ query: mockedQuery });
    };

    expect(vista.renderComponentControllerFactory(app)).toStrictEqual(app);
    expect(renderComponentControllerSpyOn).toHaveBeenCalledWith(
      mockedQuery,
      vistaComponent
    );

    const mockedGetHandler = mock();
    const mockedGet = mock().mockImplementation(() => mockedGetHandler);
    app.get = mockedGet();

    vista.renderComponentControllerFactory(app);

    expect(mockedGetHandler.mock.calls[0][0]).toBe("/test");
    expect(mockedGetHandler.mock.calls[0][1]).toBeFunction();
    expect(mockedGetHandler.mock.calls[0][2]).toStrictEqual({
      query: vistaComponent.props,
    });
  });

  it("register controllers", () => {
    const componentRepository = new ComponentRepository();

    const mockedGet = mock();
    const mockedGroup = mock();

    mock.module("elysia", () => ({
      Elysia: function () {
        return {
          get: function () {
            mockedGet(...Object.values(arguments));
            return this;
          },
          group: function () {
            mockedGroup(...Object.values(arguments));
            return this;
          },
        };
      },
    }));

    new Vista(componentRepository);

    expect(mockedGet.mock.calls[0][0]).toBe("/components");
    expect(mockedGet.mock.calls[0][1]).toBeFunction();

    expect(mockedGroup.mock.calls[0][0]).toBe("/render");
    expect(mockedGroup.mock.calls[0][1]).toBeFunction();
  });
});
