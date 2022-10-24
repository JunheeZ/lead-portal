import type { ExtractPropTypes } from "vue";

import { kanbanProps } from "./Kanban";
import { PChartProps } from "~@/components";

export type PKanbanProps = Partial<ExtractPropTypes<typeof kanbanProps>>;

export type PKanbanOption = PChartProps | {};