<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
import { ref } from 'vue'
import { FiledPropsDefine, Schema } from '../types'

export default {
  props: FiledPropsDefine,
}

declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}

export const handleChange = (e: any) => {
  const value = e.target.value
  const num = Number(value)
  props.onChange(Number.isNaN(num) ? undefined : num)
}
</script>
