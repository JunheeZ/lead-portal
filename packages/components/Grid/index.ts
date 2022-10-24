import { withInstall } from "../../utils";

import Grid from "./src/Grid";

export const PGrid = withInstall(Grid);
export default PGrid;

export type { PGridProps, PGridOption, PGridItemStyle } from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    PGrid: typeof PGrid;
  }
}