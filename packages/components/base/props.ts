import { makeStringProp, truthProp } from "../../utils";
import { ThemeModel, PTitleProps } from "../../typings/components";
import { ThemeEnum } from "../../enums";

export const BaseProps = {
  theme: makeStringProp<ThemeModel>(ThemeEnum.default),
  showTitle: truthProp,
  title: String,
  titleProps: {
    type: Object as PropType<PTitleProps>,
    default: () => ({})
  },
  padding: String,
  background: String,
  wrapperPadding: String,
  wrapperBackground: String,
  radius: Number,
  isJump: truthProp
}