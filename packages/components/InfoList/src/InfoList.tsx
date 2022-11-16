import type { CSSProperties } from "vue";
import { computed, defineComponent, unref } from "vue";
import { createBEM, createNamespace, handleNumberToPX, handleOpenWindow, isUrl, makeArrayProp } from "../../../utils";
import { PTitle } from "../../Title";
import "./index.less";
import { PInfoListOption, PInfoListOptionStyle } from "./typing";
import { BaseProps } from "../../base/props";
import { Image as VanImage, Space } from "vant";
import { ThemeEnum } from "../../../enums";

export const infoListProps = {
  ...BaseProps,
  height: Number,
  options: makeArrayProp<PInfoListOption>(),
  itemStyle: {
    type: Object as PropType<PInfoListOptionStyle>,
    default: () => ({})
  }
};

const [displayName, bem] = createNamespace("info-list");

export default defineComponent({
  name: "PInfoList",
  displayName,
  props: infoListProps,
  emits: ["click"],
  setup: function (props, {emit}) {

    const rootStyle = computed(() => {
      const {
        padding,
        background,
        wrapperPadding,
        wrapperBackground,
        radius,
        height,
        itemStyle = {} as PInfoListOptionStyle
      } = props;
      const {imageHeight, imageWidth} = itemStyle;
      const style: CSSProperties = {
        "--p-info-list-padding": padding,
        "--p-info-list-background": background,
        "--p-info-list-wrapper-padding": wrapperPadding,
        "--p-info-list-wrapper-background": wrapperBackground,
        "--p-info-list-radius": handleNumberToPX(radius),
        "--p-info-list-item-image-height": handleNumberToPX(imageHeight),
        "--p-info-list-item-image-width": handleNumberToPX(imageWidth),
        "--p-info-list-item-background": itemStyle.background,
        "--p-info-list-item-radius": handleNumberToPX(itemStyle.radius),
        "--p-info-list-item-padding": itemStyle.padding,
        "--p-info-list-height": handleNumberToPX(height)
      };
      return style;
    });

    const handleClickItem = (item: PInfoListOption, event: MouseEvent): void => {
      event?.stopPropagation();
      emit("click", item);
      if (props.isJump && isUrl(item.url as string)) {
        handleOpenWindow(item.url as string, {target: "__blank"});
      }
    };

    const renderListItemContent = (item: PInfoListOption, Bem: any) => {

      const dom = {
        image: () => (
          <VanImage
            class={`${bem("info--image")} ${Bem("image")}`}
            src={item.image}
            alt={item.title}
            fit="cover"
          />
        ),
        title: () => <header class={`${bem("info--header")} ${Bem("header")}`}>{item.title}</header>,
        content: () => <p class={`${bem("info--describe")} ${Bem("describe")}`}>{item.content}</p>,
        time: () => <p class={`${bem("info--time")} ${Bem("time")}`}>{item.time}</p>
      };

      switch (props.theme) {
        case ThemeEnum.colorful:
          return (
            <>
              {dom.title()}
              {dom.content()}
              {dom.time()}
            </>
          );
        case ThemeEnum.simple:
          return (
            <>
              <Space align="center" class={`${bem("info--title")} ${Bem("title")}`}>
                {dom.title()}
                {dom.time()}
              </Space>
              {dom.content()}
            </>
          );
        default:
          return (
            <Space
              size={12}
              fill
            >
              {dom.image()}
              <div class={bem("info--content")}>
                {dom.title()}
                {dom.time()}
              </div>
            </Space>
          );
      }
    };

    const renderListItem = (item: PInfoListOption, index: number) => {

      const Bem = createBEM(`w-info-list-${props.theme}`);

      return (
        <div
          onClick={handleClickItem.bind(this, item) as any}
          class={`${bem("info")} ${Bem()}`}
          key={`info-item-${index}`}
        >
          {renderListItemContent(item, Bem)}
        </div>
      );
    };

    return () => (
      <div class={bem([props.theme])} style={unref(rootStyle)}>
        <div class={bem("wrapper")}>
          {props.showTitle && <PTitle {...props.titleProps} title={props.title} />}
          <div class={bem("list", {"scroll": !!props?.height})}>
            <Space size={props.itemStyle?.space || 8} direction="vertical" fill>
              {props?.options?.map(renderListItem)}
            </Space>
          </div>
        </div>
      </div>
    );
  }
});