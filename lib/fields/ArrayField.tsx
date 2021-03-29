import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

// import SelectionWidget from '../widgets/Selection'
import { FiledPropsDefine, SelectionWidgetNames } from '../types'
import { useVJSFContext } from '../context'
import { getWidget } from '../theme'

import type { Schema } from '../types'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classRef = useStyles()
    const handleAdd = () => props.onAdd(props.index)
    const handleDown = () => props.onDown(props.index)
    const handleUp = () => props.onUp(props.index)
    const handleDelete = () => props.onDelete(props.index)

    return () => {
      const classes = classRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default?.()}</div>
        </div>
      )
    }
  },
})

/**
 * {
 *   items: { type: string },
 * }
 *
 * {
 *   items: [
 *    { type: string },
 *    { type: number }
 *   ]
 * }
 *
 * {
 *   items: { type: string, enum: ['1', '2'] },
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleArrayItemChange = (index: number, v: any) => {
      const { value } = props
      const arr: any = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)

    return () => {
      const { schema, rootSchema, value, errorSchema } = props
      const SchemaItem = context.SchemaItem
      const SelectionWidget = SelectionWidgetRef.value

      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as Schema).enum

      const handleAdd = (index) => {
        const { value } = props
        const arr = Array.isArray(value) ? value : []
        arr.splice(index + 1, 0, undefined)
        props.onChange(arr)
      }
      const handleDelete = (index) => {
        const { value } = props
        const arr = Array.isArray(value) ? value : []
        arr.splice(index, 1)
        props.onChange(arr)
      }
      const handleUp = (index) => {
        if (index === 0) return
        const { value } = props
        const arr = Array.isArray(value) ? value : []
        const item = arr.splice(index, 1)
        arr.splice(index - 1, 0, item[0])
        props.onChange(arr)
      }
      const handleDown = (index) => {
        const { value } = props
        const arr = Array.isArray(value) ? value : []
        if (index === arr.length - 1) return
        const item = arr.splice(index, 1)
        arr.splice(index + 1, 0, item[0])
        props.onChange(arr)
      }

      if (isMultiType) {
        const items: Schema[] = schema.items as Schema[]
        const arr = Array.isArray(value) ? value : []
        return items?.map((s, index) => (
          <SchemaItem
            key={index}
            schema={s}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v) => handleArrayItemChange(index, v)}
            errorSchema={errorSchema[index] || {}}
          />
        ))
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v, index) => (
          <ArrayItemWrapper
            onAdd={handleAdd}
            onDown={handleDown}
            onUp={handleUp}
            onDelete={handleDelete}
            index={index}
          >
            <SchemaItem
              key={index}
              schema={schema.items as Schema}
              rootSchema={rootSchema}
              value={v}
              onChange={(v) => handleArrayItemChange(index, v)}
              errorSchema={errorSchema[index] || {}}
            />
          </ArrayItemWrapper>
        ))
      } else {
        const enumOptions = (schema.items as Schema).enum
        const options = enumOptions?.map((e) => ({
          key: e,
          value: e,
        }))
        return (
          <SelectionWidget
            schema={schema}
            options={options || []}
            value={props.value}
            onChange={props.onChange}
            errors={errorSchema.__errors}
          />
        )
      }
    }
  },
})
