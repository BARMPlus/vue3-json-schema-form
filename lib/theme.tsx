import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ComputedRef,
  ref,
  ExtractPropTypes,
} from 'vue'

import { isObject } from './utils'
import { SelectionWidgetNames, CommonWidgetNames } from './types'
import { useVJSFContext } from './context'

import type {
  Theme,
  UISchema,
  CommonWidgetDefine,
  FiledPropsDefine,
} from './types'

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
  props?: ExtractPropTypes<typeof FiledPropsDefine>,
) {
  const formContext = useVJSFContext()
  if (props) {
    const { schema, uiSchema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetDefine)
    }
    if (schema.format) {
      if (formContext.formatMapRef?.[schema.format]) {
        return ref(formContext.formatMapRef?.[schema.format])
      }
    }
  }
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
