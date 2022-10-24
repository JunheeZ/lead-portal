import type { ExtractPropTypes } from "vue";
import { infoListProps } from "./InfoList";

export type PInfoListProps = Partial<ExtractPropTypes<typeof infoListProps>>;

export interface PInfoListOption {
  title: string;
  image?: string;
  time: string;
  content: string;
  url?: string;
}

export interface PInfoListOptionStyle {
  space?: number;
  background?: string;
  imageWidth?: number;
  imageHeight?: number;
  radius?: number;
  padding?: string;
}