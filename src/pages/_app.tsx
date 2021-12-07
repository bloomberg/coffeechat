import { FC } from 'react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import GlobalStyle from '../components/GlobalStyle'
import Layout from '../components/Layout'

const EmotionNextjsApp: FC<AppProps> = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      fetcher: <T extends unknown>(url: string): Promise<T> =>
        fetch(url).then((response) => response.json() as T),
    }}
  >
    <GlobalStyle />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SWRConfig>
)

export default EmotionNextjsApp
