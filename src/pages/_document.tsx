import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// This was copied from here: https://styled-components.com/docs/advanced#nextjs
// As it is a copy-paste job, code style is not important to enforce here,
// though we should turn eslint back on if we end up customizing this.

/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
export default class DocumentWithStyles extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
