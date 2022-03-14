import { Story } from '@storybook/react'
import Hello from '../Hello'

export const BasicHello: Story = (): JSX.Element => <Hello />

export default {
  title: 'Examples/Button',
  component: Hello,
}
