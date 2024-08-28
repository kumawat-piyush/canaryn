/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
import React, { useRef } from 'react'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import SessionToken from '../utils/SessionToken'

type UseOpenApiClientsReturn = {
  codeServiceClientRef: React.MutableRefObject<CodeServiceAPIClient>
}

export const getOpenAPIClientInitiator = (
  globalResponseHandler: (response: Response) => void,
  accountId: string,
  pathPrefix?: string
): any => {
  const responseInterceptor = (response: Response): Response => {
    globalResponseHandler(response.clone())
    return response
  }
  const urlInterceptor = (url: string): string => {
    return window.getApiBaseUrl(pathPrefix ? `${pathPrefix}${url}` : url)
  }
  const requestInterceptor = (request: Request): Request => {
    const oldRequest = request.clone()
    const headers = new Headers()
    for (const key of oldRequest.headers.keys()) {
      const value = oldRequest.headers.get(key) as string
      if (key.toLowerCase() !== 'authorization') {
        headers.append(key, value)
      }
    }
    if (!window.noAuthHeader) {
      headers.append('Authorization', `Bearer ${SessionToken.getToken()}`)
    }
    headers.append('Harness-Account', accountId)
    const newRequest = new Request(oldRequest, { headers })
    return newRequest
  }
  return { responseInterceptor, urlInterceptor, requestInterceptor }
}

const useOpenApiClients = (
  globalResponseHandler: (response: Response) => void,
  accountId: string
): UseOpenApiClientsReturn => {
  const openAPIClientInitiator = getOpenAPIClientInitiator(globalResponseHandler, accountId)

  const codeServiceClientRef = useRef(new CodeServiceAPIClient(openAPIClientInitiator))

  return {
    codeServiceClientRef
  }
}

export default useOpenApiClients
