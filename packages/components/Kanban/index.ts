import { withInstall } from "../../utils";

import Kanban from "./src/Kanban";

export const PKanban = withInstall(Kanban);

export default PKanban;

export type { PKanbanProps, PKanbanOption } from "./src/typing";

declare module "vue" {
  export interface GlobalComponents {
    PKanban: typeof PKanban;
  }
}