import { isObject } from "lodash-es";

declare type TargetContext = "_self" | "_blank";

export function handleOpenWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const {target = "__blank", noopener = true, noreferrer = true} = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}

export function isUrl(path: string): boolean {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

export function handleNumberToPX(px: number | undefined): string | undefined {
  return px ? `${px}px` : undefined;
}

export function deepMerge<T = any>(
  src: any = {},
  target: any = {}
): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}