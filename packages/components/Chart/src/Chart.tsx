import * as ECharts from "echarts";
import type { EChartsOption } from "echarts/types/dist/shared";
import type { CSSProperties } from "vue";
import { computed, defineComponent, onMounted, onUnmounted, ref, shallowRef, unref, watch } from "vue";
import { createNamespace, deepMerge, handleNumberToPX, truthProp } from "../../../utils";
import { useResizeObserver } from "@vueuse/core";

import "./index.less";
import { cloneDeep, isString } from "lodash-es";

const defaultOption: EChartsOption = {
  legend: {
    orient: "horizontal",
    icon: "roundRect",
    right: 10,
    top: 6,
    itemWidth: 8,
    itemHeight: 3,
    borderRadius: 2,
    borderWidth: 0,
    textStyle: {
      color: "#A6B3BD",
      fontSize: 10
    }
  },
  grid: {
    top: "18%",
    left: "4%",
    right: "5%",
    bottom: "5%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false, // 边界的差距
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#909CAE",
      fontSize: 10
    },
    axisLine: {
      show: false
    },
    data: []
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#909CAE",
      fontSize: 10
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true
    }
  },
  series: [
    /*{
      name: "",
      type: "line",
      smooth: true, // 平滑
      color: ["#FF9125"],
      showSymbol: false, // 显示标记点
      areaStyle: {
        color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(255,145,37,0)"
          },
          {
            offset: 0.17,
            color: "rgba(255,145,37,0.15)"
          },
          {
            offset: 1,
            color: "rgba(255,145,37,0.15)"
          }
        ])
      },
      data: []
    }*/
  ]
};

export const chartProps = {
  title: String,
  showTitle: truthProp,
  padding: String,
  background: String,
  radius: Number,
  width: {
    type: [Number, String],
    default: "100%"
  },
  height: {
    type: [Number, String],
    default: 200
  },
  options: {
    type: Object as PropType<EChartsOption>,
    default: () => ({...defaultOption})
  }
};

const [displayName, bem] = createNamespace("chart");

export default defineComponent({
  name: "WChart",
  displayName,
  props: chartProps,
  setup(props) {
    const ERef = ref<HTMLElement | null>(null);
    const RootRef = ref<HTMLElement | null>(null);
    const EChart = shallowRef<ECharts.ECharts | null>(null);

    const rootStyle = computed(() => {
      const {padding, background, radius} = props;
      const style: CSSProperties = {
        "--p-chart-padding": padding,
        "--p-chart-background": background,
        "--p-chart-radius": handleNumberToPX(radius)
      };
      return style;
    });

    const EChartStyle = computed(() => {
      const style: CSSProperties = {};
      const {height, width} = props;
      if (height) {
        style.height = isString(height) ? height : `${height}px`;
      }

      if (width) {
        style.width = isString(width) ? width : `${width}px`;
      }

      return style;
    });

    const getEChartOption = computed<EChartsOption>(() => deepMerge(cloneDeep(defaultOption), props.options));

    watch(
      props.options,
      () => {
        EChart.value?.setOption(unref(getEChartOption));
      },
      {deep: true}
    );

    const handleInitEChart = () => {
      if (!ERef?.value) return;

      EChart.value = ECharts.init(ERef?.value as HTMLElement);

      EChart.value?.setOption(unref(getEChartOption));
    };

    onMounted(() => {
      handleInitEChart();

      useResizeObserver(unref(RootRef), () => {
        EChart?.value?.resize();
      });
    });

    onUnmounted(() => {
      EChart.value?.dispose();
    });

    return () => (
      <div class={bem()} ref={RootRef} style={unref(rootStyle)}>
        {props.showTitle && <header class={bem("header")}>{props.title}</header>}
        <div style={unref(EChartStyle)} class={bem("echarts")} ref={ERef}></div>
      </div>
    );
  }
});