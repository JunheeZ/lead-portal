import type { CSSProperties } from "vue";
import { computed, defineComponent, unref } from "vue";
import { createNamespace, handleNumberToPX } from "../../../utils";
import { Icon } from "vant";
import "./index.less";

export const titleProps = {
  isLink: Boolean,
  title: String,
  icon: String,
  iconSize: Number,
  color: String,
  fontSize: Number,
  padding: String,
  background: String
};

const [displayName, bem] = createNamespace("title");

export default defineComponent({
  name: "WTitle",
  displayName,
  props: titleProps,
  emits: ["click"],
  setup(props, {slots, emit}) {

    const styles = computed(() => {
      const {iconSize, color, fontSize, padding, background} = props;
      const style: CSSProperties = {
        "--p-title-icon-size": handleNumberToPX(iconSize),
        "--p-title-font-size": handleNumberToPX(fontSize),
        "--p-title-color": color,
        "--p-title-padding": padding,
        "--p-title-background": background
      };
      return style;
    });

    const handleClick = () => {
      props.isLink && emit("click");
    };

    return () => (
      // @ts-ignore
      <div style={unref(styles)} class={bem({isLink: props.isLink})} onClick={handleClick}>
        <h2 class={bem("head")}>
          {props.icon && <img src={props.icon} alt="icon" class={bem("icon")} />}
          <span class={bem("text")}>{props.title || slots?.default?.()}</span>
        </h2>

        {props.isLink && <Icon class={bem("icon")} name="arrow" color="var(--gray-7)" />}
      </div>
    );
  }
});