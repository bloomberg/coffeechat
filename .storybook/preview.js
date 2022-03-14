import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../src/styles/globals.css'
import '../src/styles/fonts'

const { ipad, iphone6, iphonex } = INITIAL_VIEWPORTS

export const parameters = {
  viewport: {
    viewports: {
      iphone6,
      iphonex,
      ipad,
      smallDesktop: {
        name: 'Small Desktop',
        styles: {
          width: '1020px',
          height: '100%',
        },
      },
      largeDesktop: {
        name: 'Large Desktop',
        styles: {
          width: '1280px',
          height: '100%',
        },
      },
    },
  },
}

export const decorators = [
  (Story) => (
    <>
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    </>
  ),
]
