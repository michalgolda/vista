import { Elysia } from "elysia";
import { GreetingController } from "@/greeting";
import { RenderController } from "./render";

export const app = new Elysia()
  .use(GreetingController)
  .use(RenderController)
  .listen(3000);
