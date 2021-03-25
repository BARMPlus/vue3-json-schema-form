import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { defineComponent } from 'vue'

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      const { value } = props
      return <input type="text" value={value as any} onInput={handleChange} />
    }
  },
})

export default TextWidget
