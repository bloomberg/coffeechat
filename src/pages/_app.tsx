import { FC } from 'react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import GlobalStyle from '../components/GlobalStyle'

const EmotionNextjsApp: FC<AppProps> = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      fetcher<T>(url: string): Promise<T> {
        return fetch(url).then((response) => response.json() as unknown as T)
      },
    }}
  >
    <GlobalStyle />
    <Component {...pageProps} />
  </SWRConfig>
)

export default EmotionNextjsApp
