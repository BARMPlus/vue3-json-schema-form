import {
  defineComponent,
  provide,
  reactive,
  shallowRef,
  watch,
  watchEffect,
  ref,
} from 'vue'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

import { SchemaFormContextKey } from './context'
import SchemaItem from './SchemaItem'
import { ErrorSchema, validateFormData } from './validator'

import type { PropType, Ref } from 'vue'
import type { Options } from 'ajv'
import type { SchemaFormContextProps } from './context'
import type { Schema } from './types'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
}

export default defineComponent({
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
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
  },
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const validatorRef: Ref<Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) doValidate()
      },
      {
        deep: true,
      },
    )

    async function doValidate() {
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      if (index !== validateIndex.value) return
      errorSchemaRef.value = result.errorSchema
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            async doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    const context = reactive<SchemaFormContextProps>({
      SchemaItem,
    })

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  },
})
