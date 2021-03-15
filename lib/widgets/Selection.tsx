import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      required: true,
    },
  },
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
