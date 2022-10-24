import type { ExtractPropTypes } from "vue";
import { applicationProps } from "./Application";

export type PApplicationProps = Partial<ExtractPropTypes<typeof applicationProps>>;

export interface PApplicationOption {
  image: string;
  name: string;
  id?: number | string;
  url?: string;
}

export type PApplicationDirectionModel = "vertical" | "horizontal"

export interface PApplicationCellStyle {
  size?: number;
  radius?: number;
  round?: boolean;
  ellipsis?: boolean;
  padding?: string;
}