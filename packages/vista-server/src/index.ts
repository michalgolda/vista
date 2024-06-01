import { Vista, VistaComponentRegistry } from "../implementation/vista";
import Greeting from "./components/Greeting";

const vistaComponentRegistry = new VistaComponentRegistry().addComponent(
  Greeting
);
const vista = new Vista(vistaComponentRegistry);

vista.listen();
