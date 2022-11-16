import { makeStringProp, truthProp } from "../../utils";
import { ThemeEnum } from "../../enums";
import { PTitleProps } from '@lead-portal/components';
import { ThemeModel } from '@lead-portal/components/typing';


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