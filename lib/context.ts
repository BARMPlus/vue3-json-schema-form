import { Ref, inject, ComputedRef } from 'vue'

import type { CommonFieldType } from './types'
import type { CommonWidgetDefine, Schema } from './types'

export const SchemaFormContextKey = Symbol()

export interface SchemaFormContextProps {
  SchemaItem: CommonFieldType
  formatMapRef: ComputedRef<
    | {
        [key: string]: CommonWidgetDefine
      }
    | undefined
  >
  transformSchemaRef: any
}

export function useVJSFContext() {
  const context = inject<SchemaFormContextProps>(
    SchemaFormContextKey,
    {} as SchemaFormContextProps,
  )
  if (!context) throw Error('SchemaForm needed')
  return context
}
