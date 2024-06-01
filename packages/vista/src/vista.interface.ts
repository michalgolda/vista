import { IComponentRepository } from "./component-repository.interface";
import { IRenderer } from "./renderer.interface";

export interface IVista {
  renderer: IRenderer;
  componentRepository: IComponentRepository;
  listen(hostname: string, port: number): void;
}
