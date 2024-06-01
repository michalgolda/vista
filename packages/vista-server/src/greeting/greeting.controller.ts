import { Elysia } from "elysia";
import GreetingService from "./greeting.service";
import GreetingDTO from "./greeting.dto";

export default new Elysia().get(
  "/:name",
  ({ params }) => GreetingService.greeting(params.name),
  {
    params: GreetingDTO,
  }
);
