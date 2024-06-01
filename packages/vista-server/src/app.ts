import { Elysia } from "elysia";
import { GreetingController } from "@/greeting";

export const app = new Elysia().use(GreetingController).listen(3000);
