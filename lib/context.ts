import { inject } from 'vue'

import type { CommonFieldType } from './types'

export const SchemaFormContextKey = Symbol()

export interface SchemaFormContextProps {
  SchemaItem: CommonFieldType
}

export function useVJSFContext() {
  const context = inject<SchemaFormContextProps>(
    SchemaFormContextKey,
    {} as SchemaFormContextProps,
  )
  if (!context) throw Error('SchemaForm needed')
  return context
}
