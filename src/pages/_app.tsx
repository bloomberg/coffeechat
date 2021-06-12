import { FC } from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../components/GlobalStyle'

const EmotionNextjsApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)

export default EmotionNextjsApp
