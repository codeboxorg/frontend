import { AxiosError } from 'axios'

export class RemoteError extends Error {
  /**
   * @param description 사용자에게 표출할 오류 설명
   * @param message 디버깅용 메시지
   */
  constructor(public description: string | string[], message: string) {
    super(message)
  }
}

export class NotFoundError extends RemoteError {
  status: 404
  data: any
  constructor(data: any) {
    const message = '404 NotFoundError'
    const description = data.message ?? '요청하신 정보를 찾을 수 없습니다.'
    super(description, message)
    this.status = 404
    this.name = 'NotFoundError'
    this.data = data
  }
}

export class UnauthorizedError extends RemoteError {
  status: 401
  data: any
  constructor(data: any) {
    const message = '401 UnauthorizedError'
    const description = data.message ?? '권한이 없는 사용자 입니다.'
    super(description, message)
    this.status = 401
    this.name = 'NotFoundError'
    this.data = data
  }
}

export class BadRequestError extends RemoteError {
  status: 400
  data: any
  constructor(data: any) {
    const message = '400 BadRequestError'
    const fieldErrorDescription: string[] = data.errors
      ? Object.entries(data.errors).map(
          ([_, errorCause]) => errorCause as string
        )
      : [data.message ?? '잘못된 요청입니다.']
    super(fieldErrorDescription, message)
    this.status = 400
    this.name = 'BadRequestError'
    this.data = data
  }
}

export const throwRemoteError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const data = error.response?.data
    switch (status) {
      case 400:
        throw new BadRequestError(data)
      case 404:
        throw new NotFoundError(data)
      default:
        throw error
    }
  } else {
    throw error
  }
}