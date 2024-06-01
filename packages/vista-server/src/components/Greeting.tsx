import { t } from "elysia";
import { VistaComponent } from "../../implementation/vista";

export interface GreetingProps {
    name: string;
}

function Greeting({ name }: GreetingProps) {
    return <h1>Hello, {name}!</h1>;
}

export default new VistaComponent(Greeting, "greeting", t.Object({
    name: t.String()
}))