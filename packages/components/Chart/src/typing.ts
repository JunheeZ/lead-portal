import type { ExtractPropTypes } from "vue";
import { chartProps } from "./Chart";
import { EChartsOption } from "echarts/types/dist/shared";

export type PChartProps = Partial<ExtractPropTypes<typeof chartProps>>;

export interface PChartOption extends EChartsOption {
}