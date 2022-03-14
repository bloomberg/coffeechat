import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from '../__stories__/PageTitle.stories'

const { Default } = composeStories(stories)

describe('Hello', () => {
  test('renders fine', () => {
    render(<Default />)
    const pageTitleElement = screen.getByText('I am a Page Title')
    // example assertion to test @testing-library/jest-dom
    // not necessarily the best
    expect(pageTitleElement).toBeInTheDocument()
  })
})
