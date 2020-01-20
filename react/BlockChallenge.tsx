import React from 'react'
import getProfile from './graphql/getProfile.graphql'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import { isNil, path } from 'ramda'

const BlockChallenge = () => {
  const { data: profileData, error, loading } = useQuery(getProfile)

  if (loading || error || isNil(path(['profile'], profileData))) {
    return <ExtensionPoint id="challenge-fallback" />
  }
  return <ExtensionPoint id="challenge-content" />
}

export default BlockChallenge
