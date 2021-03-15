import { defineComponent } from 'vue'

import { FiledPropsDefine } from '../types'
import { useVJSFContext } from '../context'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((key, index) => (
        <SchemaItem
          key={index}
          schema={properties[key]}
          rootSchema={rootSchema}
          value={currentValue[key]}
          onChange={(v) => handleObjectFieldChange(key, v)}
        />
      ))
    }
  },
})
