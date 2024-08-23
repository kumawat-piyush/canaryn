import { CheckStatus } from '../interfaces'

export const mockChecksSucceededInfo = {
  header: 'All checks have succeeded',
  content: '2 succeeded',
  status: 'success' as CheckStatus
}

export const mockChecksFailedInfo = {
  header: 'Some checks have failed',
  content: '2 failed, 1 pending, 1 running,  3 succeeded',
  status: 'failure' as CheckStatus
}
