import { withInstall } from "../../utils";

import InfoList from "./src/InfoList";

export const PInfoList = withInstall(InfoList);

export default PInfoList;

export type { PInfoListProps, PInfoListOption, PInfoListOptionStyle } from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    PInfoList: typeof PInfoList;
  }
}