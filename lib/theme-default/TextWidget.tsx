import { computed, defineComponent } from 'vue'

import { withFormItem } from './FormItem'
import { CommonWidgetPropsDefine } from '../types'

import type { CommonWidgetDefine } from '../types'

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    const styleRef = computed(() => {
      return {
        color: props.options?.color || 'black',
      }
    })
    return () => {
      const { value } = props
      return (
        <input
          type="text"
          value={value as any}
          onInput={handleChange}
          style={styleRef.value}
        />
      )
    }
  },
})

export default withFormItem(TextWidget)
