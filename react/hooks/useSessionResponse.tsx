import { useEffect, useState } from 'react'
import { SessionResponse } from 'vtex.render-runtime'

import { getSession } from '../modules/session'

const useSessionResponse = () => {
  const [session, setSession] = useState<SessionResponse>()
  const sessionPromise = getSession()

  useEffect(() => {
    if (!sessionPromise) {
      return
    }

    sessionPromise.then((sessionResponse) => {
      const response = sessionResponse.response as SessionResponse

      setSession(response)
    })
  }, [sessionPromise])

  return session
}

export default useSessionResponse
