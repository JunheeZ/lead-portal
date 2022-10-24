import type {
  ComponentPublicInstance,
  ComponentRenderProxy,
  FunctionalComponent,
  PropType as VuePropType,
  VNode
} from "vue";

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  declare interface Window {
    // 全局 vue 应用实例
    __APP__: App<Element>;
  }

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type Nullable<T> = T | null;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };

  declare interface ViteEnv {
    VITE_PORT: number; // 端口
    VITE_GLOB_APP_TITLE: string; // title
    VITE_GLOB_APP_SHORT_NAME: string; // 简称
    VITE_GLOB_APP_BASE_SIZE: number; // 缩放倍率
    VITE_PUBLIC_PATH: string; // 公共路径
    VITE_GLOB_API_URL: string; // 基本接口地址
    VITE_GLOB_API_URL_PREFIX: string; // 接口前缀
    VITE_USE_IMAGEMIN: boolean; // 是否开启图片压缩
    VITE_USE_PWA: boolean; // 开启 pwa
    VITE_LEGACY: boolean; // 是否开启兼容
    VITE_PROXY: [string, string][]; // 跨越代理
    VITE_DROP_CONSOLE: boolean; // 是否删除 console
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_GLOB_IS_DEBUG: boolean;
  }

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;

    interface ElementAttributesProperty {
      $props: any;
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }

    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

declare module "vue" {
  export type JSXComponent<Props = any> =
    | { new(): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
