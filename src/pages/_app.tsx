import { FC } from 'react'
import { AppProps } from 'next/app'
// this is a special case
// tailwind.css will be bundled at "buildtime"
// we do not need this as a production dependency
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

const TailwindNextjsApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
  </>
)

export default TailwindNextjsApp
