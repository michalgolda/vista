interface ReactNode {}
interface SvelteComponent {}

enum VistaComponentType {
  STATIC = "STATIC",
  DYNAMIC = "DYNAMIC",
}

interface VistaComponent<T> {
  props: {};
  type: VistaComponentType;
  endpointName?: string;
  component: T;
}

interface VistaRenderer<T> {
  renderStatic(component: VistaComponent<T>);
  renderDynamic(component: VistaComponent<T>);
}

class ReactVistaRenderer implements VistaRenderer<ReactNode> {
  renderDynamic(component: VistaComponent<ReactNode>) {}
  renderStatic(component: VistaComponent<ReactNode>) {}
}

class SvelteVistaRenderer implements VistaRenderer<SvelteComponent> {
  renderDynamic(component: VistaComponent<SvelteComponent>) {}
  renderStatic(component: VistaComponent<SvelteComponent>) {}
}

interface VistaComponentRegistry extends Iterable<VistaComponent<any>> {
  add(component: VistaComponent<any>, renderer?: VistaRenderer<any>): void;
}

interface VistaServer {
  listen(port: number, host: string): void;
  setDefaultRenderer(renderer: VistaRenderer<any>): void;
  getDefaultRenderer(): VistaRenderer<any>;
  getComponentRegistry(): VistaComponentRegistry;
}
