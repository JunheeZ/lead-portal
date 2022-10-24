import { withInstall } from "../../utils";
import Application from "./src/Application";

export const PApplication = withInstall(Application);

export default PApplication;

export type { PApplicationProps, PApplicationOption, PApplicationDirectionModel, PApplicationCellStyle } from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    PApplication: typeof PApplication;
  }
}