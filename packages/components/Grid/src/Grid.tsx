import type { PGridItemStyle, PGridOption } from "./typing";
import type { CSSProperties } from "vue";
import { computed, defineComponent, unref } from "vue";
import {
  createBEM,
  createNamespace,
  handleNumberToPX,
  handleOpenWindow,
  isUrl,
  makeArrayProp,
  makeNumberProp
} from "../../../utils";
import { Grid, GridItem, Image as VanImage, Space } from "vant";
import { pick } from "lodash-es";
import { PTitle } from "../../Title";
import { ThemeEnum } from "../../../enums";
import { BaseProps } from "../../base/props";
import "./index.less";

const GridItemStyle: PGridItemStyle = {
  direction: "vertical",
  ellipsis: true
};

export const applyProps = {
  ...BaseProps,
  border: {type: Boolean, default: true},
  gutter: Number,
  reverse: Boolean,
  square: Boolean,
  options: makeArrayProp<PGridOption>(),
  columnNum: makeNumberProp<number>(4),
  itemStyle: {
    type: Object as PropType<PGridItemStyle>,
    default: () => ({...GridItemStyle})
  },
  showItemImage: Boolean
};

const [displayName, bem] = createNamespace("grid");

export default defineComponent({
  name: "PGrid",
  displayName,
  props: applyProps,
  emits: ["click"],
  setup(props, {emit}) {

    const ItemProps = computed(() => ({...GridItemStyle, ...props.itemStyle}));

    const styles = computed(() => {
      const {
        padding,
        fontSize,
        color,
        labelFontSize,
        labelColor,
        width,
        height,
        radius,
        background,
        textAlign
      } = unref(ItemProps);

      const style: CSSProperties = {
        "--p-grid-padding": props.padding,
        "--p-grid-background": props.background,
        "--p-grid-wrapper-radius": handleNumberToPX(props.radius),
        "--p-grid-wrapper-padding": props.wrapperPadding,
        "--p-grid-wrapper-background": props.wrapperBackground,
        "--p-grid-item-padding": padding,
        "--p-grid-item-font-size": handleNumberToPX(fontSize),
        "--p-grid-item-font-color": color,
        "--p-grid-item-label-font-color": labelColor,
        "--p-grid-item-label-font-size": labelFontSize,
        "--p-grid-item-count-width": handleNumberToPX(width),
        "--p-grid-item-count-height": handleNumberToPX(height),
        "--p-grid-item-count-radius": handleNumberToPX(radius),
        "--p-grid-item-count-background": background,
        "--p-grid-item-align": textAlign
      };

      return style;
    });

    const handleClickItem = (item: PGridOption, event: MouseEvent) => {
      event?.stopPropagation();
      emit("click", item);
      if (props.isJump && isUrl(item.url as string)) {
        handleOpenWindow(item.url as string, {target: "__blank"});
      }
    };

    const renderTitle = () => (<PTitle {...props.titleProps} title={props.title} />);

    const renderThemeContent = (item: PGridOption) => {
      const {width, round = true, radius, ellipsis} = unref(ItemProps);
      const Bem = createBEM(`w-grid-${props?.theme}`);
      const ItemBen = createBEM(bem("item") as string);

      function classes(name: string, arg?: any) {
        return `${ItemBen(name, arg)} ${Bem(name, arg)}`;
      }

      const dom = {
        image: () => (
          <VanImage
            {...{round, radius}}
            src={item.icon}
            alt={item.name}
            fit="cover"
            block
            class={classes("image")}
          />
        ),
        label: () => (<p class={classes("name", {ellipsis})}>{item.name}</p>),
        count: () => (<p class={classes("count", {ellipsis, width})}>
          <span>{item.count}</span>
        </p>)
      };

      const domKey = props.showItemImage ? "image" : "count";

      switch (props.theme) {
        case ThemeEnum.colorful:
          return (
            <>
              {dom.label()}
              {dom[domKey]?.()}
            </>
          );
        default:
          return (
            <>
              {dom[domKey]?.()}
              {dom.label()}
            </>
          );
      }
    };

    const renderGridItemContent = (item: PGridOption) => {
      const {direction, space = 4} = unref(ItemProps);
      return (
        <Space
          class={bem("item")}
          {...{direction, size: space}}
          fill
          style={{background: item.background}}
        >
          {renderThemeContent(item)}
        </Space>
      );
    };

    const renderGridItem = (item: PGridOption, index: number) => {
      return (
        <GridItem
          onClick={handleClickItem.bind(this, item)}
          key={`grid-${index}-${item.url}`}
          class={bem("cell")}
        >
          {renderGridItemContent(item)}
        </GridItem>
      );
    };

    const renderGrid = () => {
      const attrs = pick(props, ["border", "gutter", "square", "reverse", "columnNum"]);
      return (
        <Grid {...attrs}>
          {props?.options?.map(renderGridItem)}
        </Grid>
      );
    };

    return () => (
      <div class={bem([props.theme])} style={unref(styles)}>
        <div class={bem("wrapper")}>
          {props.showTitle && renderTitle()}
          {renderGrid()}
        </div>
      </div>
    );
  }
});