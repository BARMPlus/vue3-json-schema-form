import { mount } from '@vue/test-utils'

import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaFrom', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })
    const numberFiled = wrapper.findComponent(NumberField)
    expect(numberFiled.exists()).toBeTruthy()
    const input = numberFiled.find('input')
    input.element.value = '123'
    input.trigger('input')
    // await numberFiled.props('onChange')('123')
    expect(value).toBe(123)
  })
})
