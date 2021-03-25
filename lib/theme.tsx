import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ComputedRef,
} from 'vue'
import { SelectionWidgetNames, CommonWidgetNames } from './types'

import type { Theme } from './types'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)
    provide(THEME_PROVIDER_KEY, context)
    return () => slots.default && slots.default()
  },
})

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
) {
  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    THEME_PROVIDER_KEY,
  )
  if (!context) {
    throw new Error('vjsf theme require')
  }
  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })
  return widgetRef
}

export default ThemeProvider
