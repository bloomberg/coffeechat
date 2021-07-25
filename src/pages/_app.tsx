import { FC } from 'react'
import { AppProps } from 'next/app'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
        html,
        body {
          padding: 3rem 1rem;
          margin: 0;
          background: papayawhip;
          min-height: 100%;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 24px;
        }
`

const EmotionNextjsApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)
export default EmotionNextjsApp
