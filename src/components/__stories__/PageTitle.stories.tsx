import { Story } from '@storybook/react'
import PageTitle from '../PageTitle'

export default {
  title: 'PageTitle',
  component: PageTitle,
}

export const Default: Story = (): JSX.Element => (
  <PageTitle>I am a Page Title</PageTitle>
)
