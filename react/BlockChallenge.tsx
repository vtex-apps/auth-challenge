import React from 'react'
import { useSessionAuthorization } from './hooks/useSessionAuthorization'
import { useProfileAllowed } from './hooks/useProfileAllowed'
import { ExtensionPoint } from 'vtex.render-runtime'

const BlockChallenge = () => {
  const isAuthorized = useSessionAuthorization()
  const profileAllowed = useProfileAllowed(!isAuthorized)

  const isAuthenticated = isAuthorized === false ? false : profileAllowed

  if (isAuthenticated === null || isAuthenticated === false) {
    return <ExtensionPoint id="challenge-fallback" />
  }
  return <ExtensionPoint id="challenge-content" />
}

export default BlockChallenge
