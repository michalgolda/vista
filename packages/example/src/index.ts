import { Vista, ComponentRepository } from "vista";
import { VistaBlogPost, VistaGreeting } from "./components";

const componentRepository = new ComponentRepository()
  .addComponent(VistaBlogPost)
  .addComponent(VistaGreeting);

const vista = new Vista(componentRepository);

vista.listen();
