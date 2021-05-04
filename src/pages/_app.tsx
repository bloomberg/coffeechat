import { css, Global } from '@emotion/react'
import { FC } from 'react'
import { AppProps } from 'next/app'

const EmotionNextjsApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Global
      styles={css`
        html,
        body {
          padding: 3rem 1rem;
          margin: 0;
          background: papayawhip;
          min-height: 100%;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 24px;
        }
      `}
    />
    <Component {...pageProps} />
  </>
)

export default EmotionNextjsApp
