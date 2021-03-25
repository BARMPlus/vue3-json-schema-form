import { mount } from '@vue/test-utils'

import {
  NumberField,
  StringField,
  ArrayField,
  SelectionWidget,
} from '../../lib'
import TestComponent from '../utils/TestComponent'

describe('ArrayField', () => {
  it('should render multi type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: {},
        onChange() {},
      },
    })
    const arrField = wrapper.findComponent(ArrayField)
    const strField = arrField.findComponent(StringField)
    const numField = arrField.findComponent(NumberField)

    expect(arrField.exists()).toBeTruthy()
    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })
  it('should render single type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['1', '2'],
        onChange() {},
      },
    })
    const arrField = wrapper.findComponent(ArrayField)
    const strFields = arrField.findAllComponents(StringField)
    const numField = arrField.findComponent(NumberField)

    expect(arrField.exists()).toBeTruthy()
    expect(strFields.length).toBe(2)
    expect(strFields[0].props('value')).toBe('1')
    expect(numField.exists()).toBeFalsy()
  })

  it('should render enum type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2', '3'],
          },
        },
        value: [],
        onChange() {},
      },
    })
    const arrField = wrapper.findComponent(ArrayField)
    const selectionWidget = arrField.findComponent(SelectionWidget)
    expect(arrField.exists()).toBeTruthy()
    expect(selectionWidget.exists()).toBeTruthy()
  })
})
