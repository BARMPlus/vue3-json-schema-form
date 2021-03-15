import { defineComponent } from 'vue'

import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      const num = Number(value)
      props.onChange(Number.isNaN(num) ? undefined : num)
    }
    return () => {
      const { value } = props
      return <input type="number" value={value as any} onInput={handleChange} />
    }
  },
})
