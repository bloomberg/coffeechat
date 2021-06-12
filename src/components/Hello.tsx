import styled from 'styled-components'

const H1 = styled.h1`
  color: blue;
`

const Hello = ({ greeting = 'Hello' }: { greeting?: string }): JSX.Element => (
  <H1>{greeting}</H1>
)

export default Hello
