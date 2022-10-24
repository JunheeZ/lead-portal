import { type ExtractPropTypes } from "vue";
import { swipeProps } from "./Swipe";

export type PSwipeProps = Partial<ExtractPropTypes<typeof swipeProps>>;

export interface PSwipeOptions {
  src: string;
  id?: number | string;
  alt?: string;
  url?: string;
}

export type PSwipeDocType = "round" | "square" | "number";

export type PSwipeDocJustify = "start" | "end" | "center";

export interface PSwipeDocStyle {
  type: PSwipeDocType;
  justify?: PSwipeDocJustify;
  activeColor?: string;
  inactivatedColor?: string;
  activeBgColor?: string;
  inactivatedBgColor?: string;
  fontSize?: number;
  space?: number;
}