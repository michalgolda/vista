import { Elysia, t } from "elysia";
import { GreetingService } from "@/services";

export default new Elysia().get(
  "/:name",
  ({ params }) => GreetingService.greeting(params.name),
  {
    params: t.Object({
      name: t.String(),
    }),
  }
);
