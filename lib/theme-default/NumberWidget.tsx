import { defineComponent } from 'vue'

import { withFormItem } from './FormItem'
import { CommonWidgetPropsDefine } from '../types'

import type { CommonWidgetDefine } from '../types'

const NumberWidget: CommonWidgetDefine = defineComponent({
  name: 'NumberWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      const { value } = props
      return <input type="number" value={value as any} onInput={handleChange} />
    }
  },
})

export default withFormItem(NumberWidget)
