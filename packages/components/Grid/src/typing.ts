import type { ExtractPropTypes } from "vue";
import { applyProps } from "./Grid";

export type PGridProps = Partial<ExtractPropTypes<typeof applyProps>>;

export type PGridOption = {
  name: string;
  url: string;
  icon?: string;
  count?: number;
  dot?: boolean;
  badge?: number;
  background?: string;
}

export interface PGridItemStyle {
  padding?: string;
  width?: number;
  height?: number;
  radius?: number;
  round?: boolean;
  direction?: "horizontal" | "vertical";
  space?: number;
  fontSize?: number;
  color?: string;
  background?: string;
  labelFontSize?: number;
  labelColor?: string;
  ellipsis?: boolean;
  textAlign?: "left" | "center" | "right";
}