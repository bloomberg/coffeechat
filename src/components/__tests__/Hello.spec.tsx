import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from '../__stories__/Hello.stories'

const { BasicHello } = composeStories(stories)

describe('Hello', () => {
  test('renders fine', () => {
    render(<BasicHello />)
    const helloElement = screen.getByText('Hello')
    // example assertion to test @testing-library/jest-dom
    // not necessarily the best
    expect(helloElement).toBeInTheDocument()
  })
})
