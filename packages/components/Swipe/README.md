# WSwipe

## 示例

```html

<WSwipe :options="options" :doc-style="{type: 'round', space: 4}" />

<script lang="ts">
  import type { WSwipeOptions } from "@/components/WSwipe"
  import { WSwipe } from "@/components/WSwipe";
  import { ref } from "vue";

  const options = ref < WSwipeOptions[] > ([
    {
      src: "http://static.runoob.com/images/demo/demo2.jpg",
      index: 0
    },
    {
      src: "http://static.runoob.com/images/demo/demo3.jpg",
      index: 1
    },
    {
      src: "http://static.runoob.com/images/demo/demo4.jpg",
      index: 2
    },
    {
      src: "http://static.runoob.com/images/demo/demo1.jpg",
      index: 3
    }
  ]);
</script>
```

## API

### Props

| 参数       | 说明            | 类型                       | 可选值 | 默认值         |
|----------|---------------|--------------------------|-----|-------------|
| options  | 轮播图数据         | `Array<WSwipeOptions>`   | -   | `[]`        |
| height   | 内容高度          | number                   | -   | `140`       |
| radius   | 圆角大小          | number                   | -   | `10`        |
| padding  | 边距大小          | string                   | -   | `8px 12px`  |
| autoplay | 自动轮播间隔，单位为 ms | number                   | -   | `3000`      |
| duration | 动画时长，单位为 ms   | number                   | -   | `500`       |
| loop     | 是否开启循环播放      | boolean                  | -   | `true`      |
| showDoc  | 是否显示指示器       | boolean                  | -   | `true`      |
| docStyle | 指示器样式         | `Object<WSwipeDocStyle>` | -   | `[]`        |
| isJump   | 是否开启点击跳转      | boolean                  | -   | `true`      |

#### WSwipeOptions

| 参数    | 说明      | 类型                 | 可选值 | 默认值 |
|-------|---------|--------------------|-----|-----|
| src   | 图片url   | string             | -   | -   |
| id    | 图片ID    | `[number, string]` | -   | -   |
| alt   | 图片alt   | string             | -   | -   |
| href  | 点击跳转地址  | string             | -   | -   |

#### WSwipeDocStyle

| 参数                 | 说明                         | 类型       | 可选值                                              | 默认值                       |
|--------------------|----------------------------|----------|--------------------------------------------------|---------------------------|
| type               | 显示类型                       | string   | `round`<圆形><br/>`square`<方形><br/>`number`<数字>    | `round`                   |
| justify            | 显示位置                       | string   | `start`<开始位置><br/>`end`<结束位置><br/>`center`<居中>   | `center`                  |
| activeColor        | 选中时字体颜色`type=number`时生效    | string   | -                                                | `var(--blue)`             |
| inactivatedColor   | 未选中时字体颜色`type=number`时生效   | string   | -                                                | `var(--white)`            |
| fontSize           | 字体大小`type=number`时生效       | string   | -                                                | `var(--font-size-xs)`     |
| space              | 间距                         | number   | -                                                | `8`                       |
| activeBgColor      | 选中时颜色                      | string   | -                                                | `var(--white)`            |
| inactivatedBgColor | 未选中时颜色                     | string   | -                                                | `rgba(255, 255, 255, .8)` |

## Event

| 事件名   | 说明       | 回调参数                    |
|-------|----------|-------------------------|
| click | 点击轮播图时触发 | `(item: WSwipeOptions)` |