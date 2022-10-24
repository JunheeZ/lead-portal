import { withInstall } from "../../utils";
import Title from "./src/Title";

export const PTitle = withInstall(Title);

export default PTitle;

export type { PTitleProps } from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    WTitle: typeof PTitle;
  }
}