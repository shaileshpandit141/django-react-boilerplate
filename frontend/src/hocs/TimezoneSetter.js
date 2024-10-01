import { useEffect, useMemo, useCallback } from 'react'

export default function TimezoneSetter({ children }) {
  const detectedTimezone = useMemo(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }, []);

  const setTimezoneInSession = useCallback(() => {
    sessionStorage.setItem('timezone', detectedTimezone)
  }, [detectedTimezone]);

  useEffect(() => {
    setTimezoneInSession()
  }, [setTimezoneInSession])

  return children
}
