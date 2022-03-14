import { Story } from '@storybook/react'
import Button from '../Button'

export default {
  title: 'Button',
  component: Button,
}

export const Primary: Story = (): JSX.Element => <Button>I am a Button</Button>
