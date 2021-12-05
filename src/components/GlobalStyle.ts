import { createGlobalStyle } from 'styled-components'
import resetCss from './resetCss'

const GlobalStyle = createGlobalStyle`
  ${resetCss}
  html,
  body {
    font-family: 'Darker Grotesk', sans-serif;
    font-size: 12px
  }
`
export default GlobalStyle
