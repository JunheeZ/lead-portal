import type { App, Plugin } from "vue";
import Components from "./component";

const PORTAL_KEY = Symbol("PORTAL_KEY");

export function makeInstaller(components: Plugin[] = []) {
  const install = (app: App) => {
    if ((app as any)[PORTAL_KEY]) return
      ;
    (app as any)[PORTAL_KEY] = true;
    components.forEach(comp => app.use(comp));
  };

  return {install};
}


export default makeInstaller(Components);
