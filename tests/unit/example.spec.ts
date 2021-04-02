import { mount } from '@vue/test-utils'

import { NumberField } from '../../lib'
import TestComponent from '../utils/TestComponent'

describe('JsonSchemaFrom', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(TestComponent, {
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
