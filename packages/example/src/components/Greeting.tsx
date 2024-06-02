import { t } from "elysia";
import { VistaComponent } from "vista";

export interface GreetingProps {
  name: string;
}

export default function Greeting({ name }: GreetingProps) {
  return <h1>Hello, {name}!</h1>;
}

export const VistaGreeting = new VistaComponent(
  Greeting,
  "greeting",
  t.Object({
    name: t.String(),
  })
);
