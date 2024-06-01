import { Elysia } from "elysia";
import { GreetingController } from "@/controllers";

export const app = new Elysia().use(GreetingController).listen(3000);
