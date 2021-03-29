import { defineComponent, reactive } from 'vue'

const obj = {
  a: 0,
}
const A = defineComponent({
  setup() {
    debugger
    const state = reactive(obj)
    return () => {
      return (
        <div>
          <button onClick={() => (state.a = 1)}>click-{state.a}</button>
        </div>
      )
    }
  },
})

export default defineComponent({
  setup() {
    const state = reactive({})
    return () => {
      return [<A />, <A />]
    }
  },
})
