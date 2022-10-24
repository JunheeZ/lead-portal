import { withInstall } from "../../utils";
import Swipe from "./src/Swipe";

export const PSwipe = withInstall(Swipe);
export default PSwipe;

export type { PSwipeProps, PSwipeOptions, PSwipeDocType, PSwipeDocJustify, PSwipeDocStyle } from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    PSwipe: typeof PSwipe;
  }
}