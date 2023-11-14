import { useRouter } from 'next/router'
import { NextComponentType } from 'next'
import { cookies } from '../utils/cookies'

function withAuth(Component: NextComponentType) {
  const Auth = (props: any) => {
    const accesToken = cookies.get('access_token'),
      refreshToken = cookies.get('refresh_token')
    const { push } = useRouter()

    if (!accesToken && !refreshToken) {
      push('/?popup=login')
      return null
    }

    return <Component {...props} />
  }

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

export default withAuth
