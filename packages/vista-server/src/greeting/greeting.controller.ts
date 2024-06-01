import { Elysia } from "elysia";
import GreetingService from "./greeting.service";
import GreetingDTO from "./greeting.dto";

export default new Elysia().group("greeting", (controller) =>
  controller.get(
    "/:name",
    ({ params }) => GreetingService.greeting(params.name),
    {
      params: GreetingDTO,
    }
  )
);
