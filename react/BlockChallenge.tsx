import React from 'react'
import {
  ExtensionPoint,
  Session,
  SessionResponse,
  SessionUnauthorized,
  SessionForbidden,
} from 'vtex.render-runtime'

import useSessionResponse from './hooks/useSessionResponse'

const isSessionUnauthorized = (
  session: SessionResponse | undefined
): session is SessionUnauthorized =>
  (session as SessionUnauthorized)?.type?.toLowerCase() === 'unauthorized'

const isSessionForbidden = (
  session: SessionResponse | undefined
): session is SessionForbidden =>
  (session as SessionForbidden)?.type?.toLowerCase() === 'forbidden'

const isProfileAllowed = (sessionResponse: SessionResponse | undefined) => {
  if (sessionResponse == null) {
    return null
  }

  const hasAccessToTradePolicy = (sessionResponse as Session).namespaces?.store
    ?.channel

  const isLoggedIn = (sessionResponse as Session).namespaces?.profile?.email

  if (isLoggedIn && hasAccessToTradePolicy) {
    return 'authorized'
  }

  if (isLoggedIn) {
    return 'forbidden'
  }

  return 'unauthorized'
}

const BlockChallenge = () => {
  const sessionResponse = useSessionResponse()

  const isUnauthorized = isSessionUnauthorized(sessionResponse)
  const isForbidden = isSessionForbidden(sessionResponse)
  const profileCondition = isProfileAllowed(sessionResponse)

  if (!sessionResponse) {
    return null
  }

  const defaultHidden = sessionResponse == null

  if (
    defaultHidden ||
    isUnauthorized === true ||
    isForbidden === true ||
    profileCondition === 'unauthorized' ||
    profileCondition === 'forbidden'
  ) {
    return <ExtensionPoint id="challenge-fallback" />
  }

  return <ExtensionPoint id="challenge-content" />
}

export default BlockChallenge
