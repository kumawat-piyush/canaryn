import { useEffect, useMemo, useState } from 'react'
import { TypesPullReq, TypesRepository, useChecksPullReqQuery } from '@harnessio/code-service-client'

import { ExecutionState } from '../../../types'
import { determineStatusMessage, generateStatusSummary } from '../utils'

interface Check {
  check: {
    status: ExecutionState
  }
}

interface Data {
  checks: Check[]
}
export function usePRChecksDecision({
  repoMetadata,
  pullReqMetadata
}: {
  repoMetadata: TypesRepository | undefined
  pullReqMetadata: TypesPullReq | undefined
}) {
  const { data, error, refetch } = useChecksPullReqQuery({
    repo_ref: `${repoMetadata?.path}/+`,
    pullreq_number: pullReqMetadata?.number ?? 0,
    queryParams: { debounce: 500 }
  })
  const [count, setCount] = useState(DEFAULT_COUNTS)
  const [color, setColor] = useState<string>('GREEN_500')
  const [background, setBackground] = useState<string>('GREEN_50')
  const [message, setMessage] = useState('')
  const [complete, setComplete] = useState(true)
  const [summaryText, setSummaryText] = useState('')
  const [checkInfo, setCheckInfo] = useState<{
    title: string
    content: string
    color: string
    status: string
  }>({ title: '', content: '', color: '', status: '' })

  const status = useMemo(() => {
    let _status: ExecutionState | undefined
    const _count = { ...DEFAULT_COUNTS }
    // @ts-expect-error remove "@ts-expect-error" once CodeServiceClient Response for useChecksPullReqQuery is fixed
    const total = data?.checks?.length
    // @ts-expect-error remove "@ts-expect-error" once CodeServiceClient Response for useChecksPullReqQuery is fixed
    const { message: summaryMessage } = generateStatusSummary(data?.checks)
    setSummaryText(summaryMessage)
    // @ts-expect-error remove "@ts-expect-error" once CodeServiceClient Response for useChecksPullReqQuery is fixed
    const checkInfoData = determineStatusMessage(data?.checks)
    if (checkInfoData) {
      setCheckInfo(checkInfoData)
    }
    if (total) {
      // @ts-expect-error remove "@ts-expect-error" once CodeServiceClient Response for useChecksPullReqQuery is fixed
      for (const check of (data as Data).checks) {
        switch (check.check.status) {
          case ExecutionState.ERROR:
          case ExecutionState.FAILURE:
          case ExecutionState.RUNNING:
          case ExecutionState.PENDING:
          case ExecutionState.SUCCESS:
            _count[check.check.status]++
            setCount({ ..._count })
            break
          default:
            console.error('Unrecognized PR check status', check)
            break
        }
      }

      if (_count.error) {
        _status = ExecutionState.ERROR
        setColor('text-destructive')
        setBackground('text-destructive')
        setMessage(`${_count.error}/${total} ${_count.error === 1 ? 'check' : 'checks'} errored out.`)
        // setMessage(stringSubstitute(getString('prChecks.error'), { count: _count.error, total }) as string)
      } else if (_count.failure) {
        _status = ExecutionState.FAILURE
        setColor('text-destructive')
        setBackground('text-destructive')
        setMessage(`${_count.failure}/${total} ${_count.failure === 1 ? 'check' : 'checks'} failed.`)
        // setMessage(stringSubstitute(getString('prChecks.failure'), { count: _count.failure, total }) as string)
      } else if (_count.killed) {
        _status = ExecutionState.KILLED
        setColor('text-destructive')
        setBackground('text-destructive')
        setMessage(`${_count.killed}/${total} ${_count.killed === 1 ? 'check' : 'checks'} killed.`)

        // setMessage(stringSubstitute(getString('prChecks.killed'), { count: _count.killed, total }) as string)
      } else if (_count.running) {
        _status = ExecutionState.RUNNING
        setColor('text-warning')
        setBackground('text-warning')
        setMessage(`${_count.running}/${total} ${_count.running === 1 ? 'check' : 'checks'} running.`)

        // setMessage(stringSubstitute(getString('prChecks.running'), { count: _count.running, total }) as string)
      } else if (_count.pending) {
        _status = ExecutionState.PENDING
        setColor('text-tertiary-background')
        setBackground('text-tertiary-background')
        setMessage(`${_count.pending}/${total} ${_count.pending === 1 ? 'check' : 'checks'} pending.`)

        // setMessage(stringSubstitute(getString('prChecks.pending'), { count: _count.pending, total }) as string)
      } else if (_count.skipped) {
        _status = ExecutionState.SKIPPED
        setColor('text-tertiary-background')
        setBackground('text-tertiary-background')
        setMessage(`${_count.skipped}/${total} ${_count.skipped === 1 ? 'check' : 'checks'} skipped.`)

        // setMessage(stringSubstitute(getString('prChecks.skipped'), { count: _count.skipped, total }) as string)
      } else if (_count.success) {
        _status = ExecutionState.SUCCESS
        setColor('text-success')
        setBackground('text-success')
        setMessage(`${_count.success}/${total} ${_count.success === 1 ? 'check' : 'checks'} succeeded.`)

        // setMessage(stringSubstitute(getString('prChecks.success'), { count: _count.success, total }) as string)
      }

      setComplete(!_count.pending && !_count.running)
    } else {
      setComplete(false)
    }

    return _status
  }, [data])

  useEffect(() => {
    let tornDown = false
    const pollingFn = () => {
      if (repoMetadata?.path && pullReqMetadata?.source_sha && !complete && !tornDown) {
        // TODO: fix racing condition where an ongoing refetch of the old sha overwrites the new one.
        // TEMPORARY SOLUTION: set debounce to 1 second to reduce likelyhood
        // refetch({ debounce: 1 }).then(() => { -- theres no debounce on refetches rn
        refetch().then(() => {
          if (!tornDown) {
            interval = window.setTimeout(pollingFn, POLLING_INTERVAL)
          }
        })
      }
    }
    let interval = window.setTimeout(pollingFn, POLLING_INTERVAL)
    return () => {
      tornDown = true
      window.clearTimeout(interval)
    }
  }, [repoMetadata?.path, pullReqMetadata?.source_sha, complete]) // eslint-disable-line react-hooks/exhaustive-deps
  return {
    overallStatus: status,
    count,
    error,
    data,
    color,
    background,
    message,
    checkInfo,
    summaryText
  }
}

export type PRChecksDecisionResult = ReturnType<typeof usePRChecksDecision>

const POLLING_INTERVAL = 10000

const DEFAULT_COUNTS = {
  error: 0,
  failure: 0,
  pending: 0,
  running: 0,
  success: 0,
  skipped: 0,
  killed: 0
}
