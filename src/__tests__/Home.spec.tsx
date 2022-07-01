import { render } from '@testing-library/react'
import { Session } from 'next-auth'
import { SessionProvider, useSession } from 'next-auth/react'
import { FC } from 'react'
import Home from '../pages/home'

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({ data: null }),
  SessionProvider: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
  signOut: jest.fn(),
}))

describe('Home Page', () => {
  let container: HTMLElement

  const WrappedHome: FC = () => {
    return (
      <SessionProvider>
        <Home />
      </SessionProvider>
    )
  }
  describe('session exists', () => {
    beforeEach(async () => {
      const data: Session = {
        user: {
          name: 'Test Testoff',
        },
      } as Session
      ;(useSession as jest.Mock).mockReturnValue({ data })
      ;({ container } = render(<WrappedHome />))
    })

    it('displays username', () => {
      expect(container).toMatchSnapshot()
    })
    it('calls useSession with required Args', () => {
      expect(useSession).toHaveBeenCalledWith({
        required: true,
        onUnauthenticated: expect.any(Function) as () => void,
      })
    })
  })
})
