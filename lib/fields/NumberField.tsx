import { defineComponent } from 'vue'

import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup() {
    return () => <div>Number field</div>
  },
})
