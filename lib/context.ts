import { defineComponent } from 'vue'

import { FiledPropsDefine } from './types'

export const SchemaFormContextKey = Symbol()

const TypeHelperComponent = defineComponent({ props: FiledPropsDefine })

export interface SchemaFormContextProps {
  SchemaItem: typeof TypeHelperComponent
}
