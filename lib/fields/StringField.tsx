import { defineComponent } from 'vue'

import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    const handleChange = (v: string) => {
      props.onChange(v)
    }
    return () => {
      const { schema, rootSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value
      return <TextWidget {...rest} onChange={handleChange} />
    }
  },
})
