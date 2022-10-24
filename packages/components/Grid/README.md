# WSwipe

## 示例

```html

<WGrid :options="apply" :columnNum="2" :itemStyle="{direction: 'horizontal', space: 10}" />

<script lang="ts">
  import type { WGridOption } from "@/components/WGrid"
  import { WGrid } from "@/components/WGrid";
  import { ref } from "vue";

  const apply = ref < WGridOption[] > ([
    {
      text: "待办事项",
      icon: "http://static.runoob.com/images/demo/demo1.jpg",
      url: "https://www.baidu.com"
    },
    {
      text: "学习地图",
      icon: "http://static.runoob.com/images/demo/demo2.jpg",
      url: "https://www.baidu.com"
    },
    {
      text: "运维工单",
      icon: "http://static.runoob.com/images/demo/demo3.jpg",
      url: "https://www.baidu.com"
    }
  ]);
</script>
```

## API

### Props

| 参数         | 说明             | 类型                        | 可选值 | 默认值     |
|------------|----------------|---------------------------|-----|---------|
| title      | 标题             | `string`                  | -   | `应用中心`  |
| showTitle  | 是否显示标题         | `boolean`                 | -   | `true`  |
| border     | 是否显示边框         | `boolean`                 | -   | `true`  |
| gutter     | 间距             | `number`                  | -   | `0`     |
| reverse    | 是否调换图标和文本的位置   | `boolean`                 | -   | `false` |
| square     | 是否将格子固定为正方形    | `boolean`                 | -   | `false` |
| columnNum  | 列数             | `number`                  | -   | `3`     |
| options    | 要显示的数据         | `Array<WGridOption>`     | -   | `[]`    |
| itemStyle  | 每项显示样式         | `Object<WGridItemStyle>` | -   | `{}`    |
| isJump     | 是否开启点击跳转       | boolean                   | -   | `true`  |

#### Object WGridOption

| 参数     | 说明        | 类型       | 可选值 | 默认值     |
|--------|-----------|----------|----|---------|
| text   | 名称        | string   | -  | -       |
| icon   | 图片url     | string   | -  | -       |
| url    | 点击跳转地址    | string   | -  | -       |
| dot    | 是否显示角标    | boolean  | -  | `false` |
| badge  | 是否显示角标内容  | number   | -  | -       |

#### Object WGridItemStyle

| 参数         | 说明        | 类型        | 可选值                     | 默认值       |
|------------|-----------|-----------|-------------------------|-----------|
| padding    | 边距        | string    | -                       | -         |
| width      | 图标宽度      | number    | -                       | `40`      |
| height     | 图标高度      | number    | -                       | `40`      |
| radius     | 圆角大小      | number    | -                       | `0`       |
| round      | 是否显示为圆形   | boolean   | -                       | `true`    |
| direction  | 排序方式      | string    | `horizontal`/`vertical` | `true`    |
| space      | 间距        | number    | -                       | `4`       |
| fontSize   | 字体大小      | number    | -                       | `14`      |
| color      | 字体颜色      | string    | -                       | `#1F2329` |
| ellipsis   | 是否超出省略    | boolean   | -                       | `false`   |

## Event

| 事件名   | 说明      | 回调参数                    |
|-------|---------|-------------------------|
| click | 点击某项时触发 | `(item: WGridOption)`  |