import type { PSwipeDocStyle, PSwipeOptions } from "./typing";
import type { SwipeInstance } from "vant";
import type { CSSProperties } from "vue";
import { Space, Swipe, SwipeItem } from "vant";
import { computed, defineComponent, ref, unref, watch } from "vue";
import {
  createNamespace,
  handleOpenWindow,
  isUrl,
  makeArrayProp,
  makeNumberProp,
  makeStringProp,
  truthProp
} from "../../../utils";
import { isEqual } from "lodash-es";
import "./index.less";

export const docDefault: PSwipeDocStyle = {
  type: "number",
  justify: "center",
  space: 8
};

export const swipeProps = {
  height: makeNumberProp(0),
  radius: makeNumberProp(0),
  padding: makeStringProp(""),
  autoplay: makeNumberProp(3000),
  duration: makeNumberProp(600),
  showDoc: truthProp, // {type: Boolean, default: false},
  loop: truthProp,
  options: makeArrayProp<PSwipeOptions>(),
  docStyle: {
    type: Object as PropType<PSwipeDocStyle>,
    default: () => ({...docDefault})
  },
  isJump: truthProp
};

const [name, bem] = createNamespace("swipe");

export default defineComponent({
  name,
  props: swipeProps,
  emits: ["click"],
  setup(props, {emit}) {
    const SwipeRef = ref<SwipeInstance | null>(null);
    const DocStyle = computed(() => ({...docDefault, ...props.docStyle}));

    watch(
      props.options,
      handleResize,
      {deep: true}
    );

    function handleItemClick(item: PSwipeOptions) {
      emit("click", item);
      if (props.isJump && isUrl(item.url as string)) {
        handleOpenWindow(item.url as string, {target: "__blank"});
      }
    }

    function handleResize() {
      SwipeRef?.value?.resize();
    }

    const styles = computed(() => {
      const {height, radius, padding} = props;
      const {activeColor, inactivatedColor, activeBgColor, inactivatedBgColor, justify, fontSize} = unref(DocStyle);
      const style: CSSProperties = {
        "--p-swipe-padding": padding,
        "--p-swipe-doc-justify": justify,
        "--p-swipe-doc-color": activeColor,
        "--p-swipe-doc-inactivated-color": inactivatedColor,
        "--p-swipe-doc-bg-color": activeBgColor,
        "--p-swipe-doc-inactivated-bg-color": inactivatedBgColor,
        "--p-swipe-doc-font-size": fontSize
      };

      if (height) {
        style["--p-swipe-height"] = `${height}px`;
      }

      if (radius) {
        style["--p-swipe-border-radius"] = `${radius}px`;
      }

      return style;
    });

    const Slots = {
      indicator: ({active, total}: { active: number, total: number }) => {
        if (!props.showDoc) return null;
        const {type, space}: PSwipeDocStyle = unref(DocStyle);

        const renderDoc = (_: number, index: number) => {
          const activation = isEqual(index, active);
          return (
            <i class={bem("indicator", [type, {[type + "--active"]: activation, active: activation}])}>
              {isEqual(type, "number") ? index + 1 : ""}
            </i>
          );
        };

        return (
          <div class={bem("indicators")}>
            <Space fill align={"end"} size={space || 8}>
              {Array(total).fill("").map(renderDoc)}
            </Space>
          </div>
        );
      }
    };

    const RenderItems = () => {
      return props
        ?.options
        ?.map((item: PSwipeOptions, index: number) => (
          <SwipeItem
            key={`swipe-${index}-${item.src}`}
            onClick={handleItemClick.bind(this, item)}
          >
            <img class={bem("image")} src={item.src} alt={(item.alt || item.id) as string} />
          </SwipeItem>
        ));
    };

    return () => {
      const {autoplay, loop, duration} = props;

      return (
        <div
          class={bem([])}
          style={unref(styles)}
        >
          <Swipe
            ref={SwipeRef}
            {...{autoplay, loop, duration}}
            v-slots={Slots}
          >
            {RenderItems()}
          </Swipe>
        </div>
      );
    };
  }
});