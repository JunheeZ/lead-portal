import { withInstall } from "../../utils";

import Chart from "./src/Chart";

export const PChart = withInstall(Chart);

export default PChart;

export type { PChartProps, PChartOption } from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    PChart: typeof PChart;
  }
}