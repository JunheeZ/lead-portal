<template>
  <div class="p-app">
    <PGrid v-bind="bind" />
  </div>
</template>

<script setup lang="ts">
import { PGrid, ThemeEnum } from "@lead-portal/components";
import { ref } from "vue";

const bind = ref({
  showTitle: false,
  theme: ThemeEnum.simple,
  columnNum: 4,
  border: false,
  isJump: false,
  gutter: 0,
  itemStyle: {
    color: "#fff",
    labelColor: "#fff",
    textAlign: "center",
    fontSize: 30,
    width: 56,
    height: 56,
    background: "rgba(255, 255, 255, 0.2)",
    radius: 18,
    space: 12
  },
  wrapperBackground: "",
  options: [
    {
      name: "待办事项待办事项",
      icon: "http://static.runoob.com/images/demo/demo1.jpg",
      url: "https://www.baidu.com",
      count: 0
    },
    {
      name: "学习地图",
      icon: "http://static.runoob.com/images/demo/demo2.jpg",
      url: "https://www.baidu.com",
      count: 22
    },
    {
      name: "运维工单",
      icon: "http://static.runoob.com/images/demo/demo3.jpg",
      url: "https://www.baidu.com",
      count: 3333
    },
    {
      name: "数据说明",
      icon: "http://static.runoob.com/images/demo/demo4.jpg",
      url: "https://www.baidu.com",
      count: 4
    }
  ]
});
</script>

<style scoped>
.p-app {
  background: var(--blue);
}
</style>
