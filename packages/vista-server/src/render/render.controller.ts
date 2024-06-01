import { Elysia } from "elysia";
import RenderService from "./render.service";
import RenderDTO from "./render.dto";

export default new Elysia().group("render", (controller) =>
  controller.get(
    "/:componentName",
    ({ params, query }) => RenderService.render(params.componentName, query),
    {
      params: RenderDTO,
    }
  )
);
