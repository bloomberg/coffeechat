import { render } from '@testing-library/react'
import useSWR from 'swr'
import Router from 'next/router'
import HomeType from '../pages/home'

jest.mock('next/router', () => ({ push: jest.fn() }))
jest.mock('swr')
describe('Home Page', () => {
  let Home: typeof HomeType
  let container: HTMLElement
  beforeEach(async () => {
    ;({ default: Home } = await import('../pages/home'))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('receives all the data', () => {
    const response = { jwt: 'abcd', user: { given_name: 'pqrs' } }
    beforeEach(async () => {
      ;(useSWR as jest.Mock).mockReturnValue({
        data: response,
      })
      ;({ container } = render(<Home />))
    })

    it('attaches username', () => {
      expect(container).toMatchSnapshot()
    })
  })
  describe('data still loading', () => {
    beforeEach(() => {
      ;(useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: null,
      })
      ;({ container } = render(<Home />))
    })

    it('returns loading state', () => {
      expect(container).toMatchSnapshot()
    })
  })
  describe('receives error', () => {
    beforeEach(() => {
      ;(useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: 'error',
      })
      ;({ container } = render(<Home />))
    })
    it('returns to login page', () => {
      expect(Router.push).toHaveBeenCalledWith('/login/oidc')
    })
  })
})
