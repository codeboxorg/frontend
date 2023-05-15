import { RemoteError } from '@api/error/remoteError'
import AuthContainer from '@components/auth/AuthContainer'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

type Props = {
  error?: RemoteError & { status?: number }
  pagePermissionInfo: Required<PagePermissionInfo>
  isPermissionRequired: boolean
  children: ReactElement
}

const SSRErrorHandleContainer = ({
  error,
  pagePermissionInfo,
  isPermissionRequired,
  children,
}: Props) => {
  const router = useRouter()
  const { redirect } = pagePermissionInfo

  if (error) console.debug('SSRErrorHandler', error)

  useEffect(() => {
    if (!error) return
    switch (error.status) {
      case 401:
        router.push(redirect)
        break
      default:
        router.push('/error')
    }
  }, [error])

  if (error) {
    return <></>
  }

  /**
   * Next server측에서 오류가 없더라도 CSR시에 프라이빗 라우팅을 유지하기 위해 권한이 필요한 페이지인 경우
   * AuthContainer로 감싸준다.
   */
  if (isPermissionRequired) {
    return (
      <AuthContainer pagePermissionInfo={pagePermissionInfo}>
        {children}
      </AuthContainer>
    )
  }

  return children
}

export default SSRErrorHandleContainer
