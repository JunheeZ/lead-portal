import type { ExtractPropTypes } from "vue";
import { kanbanProps } from "./Kanban";
import { PChartProps } from "../../Chart";

export type PKanbanProps = Partial<ExtractPropTypes<typeof kanbanProps>>;

export interface PKanbanOption extends PChartProps {
}