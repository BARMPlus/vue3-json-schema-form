import { defineComponent, ref, watch } from 'vue'

import { withFormItem } from './FormItem'
import { SelectionWidgetPropsDefine } from '../types'

import type { SelectionWidgetDefine } from '../types'

const SelectionWidget: SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value)
    watch(currentValueRef, (newValue, oldValue) => {
      if (newValue !== props.value) {
        props.onChange(newValue)
      }
    })
    watch(
      () => props.value,
      (value) => {
        if (value !== currentValueRef.value) {
          currentValueRef.value = value
        }
      },
    )
    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {options.map((op) => (
            <option value={op.value}>{op.key}</option>
          ))}
        </select>
      )
    }
  },
})

export default withFormItem(SelectionWidget)
