import type { CSSProperties } from "vue";
import { computed, defineComponent, unref } from "vue";
import { createNamespace, handleNumberToPX } from "../../../utils";
import { PTitle } from "../../Title";
import { PChart, type PChartProps } from "../../Chart";
import { BaseProps } from "../../base/props";
import { Space } from "vant";

import "./index.less";

export const kanbanProps = {
  ...BaseProps,
  options: {
    type: Array as PropType<PChartProps[]>,
    default: () => []
  }
};

const [displayName, bem] = createNamespace("kanban");

export default defineComponent({
  name: "PKanban",
  displayName,
  props: kanbanProps,
  setup(props) {

    const rootStyle = computed(() => {
      const style: CSSProperties = {
        "--p-kanban-padding": props.padding,
        "--p-kanban-background": props.background,
        "--p-kanban-wrapper-radius": handleNumberToPX(props.radius),
        "--p-kanban-wrapper-padding": props.wrapperPadding,
        "--p-kanban-wrapper-background": props.wrapperBackground
      };
      return style;
    });

    const renderTitle = () => (<PTitle {...props.titleProps} title={props.title} />);

    const renderPChart = (attrs: PChartProps, index: number) => {
      return (
        <PChart key={`w-chart-${index}`} {...attrs} />
      );
    };

    return () => (
      <div class={bem()} style={unref(rootStyle)}>
        <div class={bem("wrapper")}>
          {props.showTitle && renderTitle()}

          <Space direction="vertical" fill size={10}>
            {props.options?.map(renderPChart)}
          </Space>
        </div>
      </div>
    );
  }
});