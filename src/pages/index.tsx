import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import PrimaryButton from '../components/PrimaryButton'

const AppTitle = styled.span`
  font-size: 30px;
  font-weight: 700;
`

const PageTitleText = styled.h1`
  font-size: 30px;
  font-weight: 700;

  margin-bottom: 57px;
`

const Layout = styled.div`
  /* outline: 1px solid red; */
`
const TitleBar = styled.div`
  /* outline: 1px solid blue; */
  padding: 48px 69px;
`
const Content = styled.div`
  /* outline: 1px solid green; */
`

const Card = styled.div`
  display: flex;
  flex-flow: column;
  background: #f1f1f1;
  align-items: center;
  /* outline: 1px dotted blue; */
  width: 477px;
  height: 300px;
  margin: 0 auto;
  padding-top: 49px;
  padding-bottom: 30px;
`

const PageTitle = ({ children }: { children: string }): JSX.Element => (
  <>
    <PageTitleText>{children}</PageTitleText>
  </>
)

const HomePage: NextPage = () => (
  <Layout>
    <TitleBar>
      <AppTitle>Coffee Chat</AppTitle>
    </TitleBar>
    <Content>
      <Card>
        <PageTitle> Welcome </PageTitle>
        <Link href="/login/oidc" passHref>
          <PrimaryButton>Sign In with OSS</PrimaryButton>
        </Link>
      </Card>
    </Content>
  </Layout>
)

export default HomePage
