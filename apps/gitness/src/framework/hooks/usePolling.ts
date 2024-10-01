import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Custom hook for polling an API at regular intervals.
 *
 * @param fetchFunction - The function to call for fetching data. Should return a Promise.
 * @param delay - Polling interval in milliseconds.
 * @returns data, error, and a function to stop polling.
 */
function usePolling<T>(fetchFunction: () => Promise<T>, delay: number) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isPollingRef = useRef(false)
  const isMounted = useRef(true)

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const fetchData = useCallback(async () => {
    if (isPollingRef.current) return

    isPollingRef.current = true
    try {
      const result = await fetchFunction()
      if (isMounted.current) {
        setData(result)
        setError(null)
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        setError(err as Error)
      }
    } finally {
      isPollingRef.current = false
    }
  }, [fetchFunction])

  useEffect(() => {
    isMounted.current = true
    fetchData()

    intervalRef.current = setInterval(fetchData, delay) // Set up polling

    return () => {
      isMounted.current = false
      stopPolling() // Clean up on unmount
    }
  }, [fetchData, delay, stopPolling])

  return { data, error, stopPolling }
}

export default usePolling
