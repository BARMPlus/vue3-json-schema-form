import { defineComponent } from 'vue'

import { CommonWidgetNames, FiledPropsDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props) {
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    const handleChange = (v: string) => {
      const num = Number(v)
      props.onChange(Number.isNaN(num) ? undefined : num)
    }
    return () => {
      const { schema, rootSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value
      return <NumberWidget {...rest} onChange={handleChange} />
    }
  },
})
