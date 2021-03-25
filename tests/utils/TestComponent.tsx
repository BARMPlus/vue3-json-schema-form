import { defineComponent, PropType } from 'vue'

import JsonSchemaForm, { ThemeProvider } from '../../lib'
import { Schema } from '../../lib/types'
import defaultTheme from '../../lib/theme-default'

export const ThemeDefaultProvider = defineComponent({
  setup(props, { slots }) {
    return () => (
      <ThemeProvider theme={defaultTheme}>{slots.default?.()}</ThemeProvider>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <JsonSchemaForm {...props} />
      </ThemeDefaultProvider>
    )
  },
})
