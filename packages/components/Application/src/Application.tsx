import type { CSSProperties } from "vue";
import { computed, defineComponent, unref } from "vue";
import {
  createNamespace,
  handleNumberToPX,
  handleOpenWindow,
  isUrl,
  makeNumberProp,
  makeStringProp,
  truthProp
} from "../../../utils";
import { PTitle } from "../../Title";
import { BaseProps } from "../../base/props";
import { PApplicationCellStyle, PApplicationDirectionModel, PApplicationOption } from "./types";
import { Grid, GridItem, Image as VanImage, Space } from "vant";
import { isEmpty, pick, take } from "lodash-es";
import MoreIcon from "./more-app.svg";
import "./index.less";

export const applicationProps = {
  ...BaseProps,
  options: {
    type: Array as PropType<PApplicationOption[]>,
    default: () => []
  },
  columnNum: makeNumberProp(4),
  border: Boolean,
  gutter: Number,
  square: Boolean,
  direction: makeStringProp<PApplicationDirectionModel>("vertical"),
  showMore: truthProp,
  cellStyle: {
    type: Object as PropType<PApplicationCellStyle>,
    default: () => ({})
  },
  maxLength: makeNumberProp(3),
  list: {
    type: Array as PropType<PApplicationOption[]>,
    default: () => []
  }
};

const [displayName, bem] = createNamespace("application");

export default defineComponent({
  name: "PApplication",
  displayName,
  props: applicationProps,
  emits: ["click", "clickMore"],
  setup(props, {emit}) {

    const rootStyle = computed(() => {
      const {padding, background, wrapperPadding, wrapperBackground, radius, cellStyle} = props;
      const {size} = cellStyle;
      const style: CSSProperties = {
        "--p-app-padding": padding,
        "--p-app-background": background,
        "--p-app-wrapper-padding": wrapperPadding,
        "--p-app-wrapper-background": wrapperBackground,
        "--p-app-wrapper-radius": handleNumberToPX(radius),

        "--p-app-image-size": handleNumberToPX(size),
        "--p-app-image-radius": handleNumberToPX(cellStyle?.radius),
        "--p-app-cell-padding": cellStyle?.padding
      };
      return style;
    });

    const handleClickAppItem = (item: PApplicationOption, event: MouseEvent) => {
      event?.stopPropagation();
      emit("click", item);
      if (props.isJump && isUrl(item.url as string)) {
        handleOpenWindow(item.url as string, {target: "__blank"});
      }
    };

    const handleClickMore = (event: MouseEvent) => {
      event?.stopPropagation();
      emit("clickMore", props.options);
    };

    const renderTitle = () => (<PTitle {...props.titleProps} title={props.title} />);

    const renderItem = (item: PApplicationOption, isMore?: boolean) => {
      const {direction, cellStyle} = props;
      const {ellipsis, round} = cellStyle;
      return (
        <Space direction={props.direction} fill class={bem("space")}>
          <VanImage
            class={bem("image", {round, more: isMore})}
            src={item.image}
            alt={item.name}
            fit="cover"
          />
          <p class={bem("label", [direction, {more: isMore, ellipsis}])}>{item.name}</p>
        </Space>
      );
    };

    const renderGridItem = (item: PApplicationOption, index: number) => {
      return (
        <GridItem
          key={`app-grid-${index}`}
          class={bem("cell")}
          onClick={handleClickAppItem.bind(this, item)}
        >
          {renderItem(item)}
        </GridItem>
      );
    };

    const renderMore = () => {
      const item: PApplicationOption = {
        image: MoreIcon as any,
        name: {vertical: "更多", horizontal: "前往更多"}[props.direction]
      };
      return (
        <GridItem
          class={bem("cell", ["more"])}
          onClick={handleClickMore}
        >
          {renderItem(item, true)}
        </GridItem>
      );
    };

    const gridAttr = computed(() => pick(props, ["border", "gutter", "square"]));

    const cell = computed<PApplicationOption[]>(() => {
      const {list, options, maxLength} = props;
      if (isEmpty(list)) {
        return take(options, maxLength);
      }
      return list;
    });

    return () => (
      <div class={bem()} style={unref(rootStyle)}>
        <div class={bem("wrapper")}>
          {props.showTitle && renderTitle()}
          <Grid
            class={bem("grid")}
            columnNum={props.columnNum}
            {...unref(gridAttr)}
            center={false}
          >
            {unref(cell)?.map(renderGridItem)}
            {props.showMore && renderMore()}
          </Grid>
        </div>
      </div>
    );
  }
});