import { LivelogLine } from '@harnessio/code-service-client'
import { capitalize } from 'lodash-es'

export const generateFriendlyName = (propertyName: string): string => {
  return capitalize(propertyName.split('_').join(' '))
}

export const createAndDownloadLogsBlob = (logs: LivelogLine[] | undefined, fileName: string = 'logs') => {
  if (!logs?.length) return
  const output = getLogsText(logs)
  const link = document.createElement('a')
  const blob = new Blob([output], { type: 'application/text' })

  link.download = `${fileName}.log`
  link.href = URL.createObjectURL(blob)
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const getLogsText = (logs: LivelogLine[]) => {
  let output = ''
  for (let i = 0; i < logs.length; ++i) {
    output += logs[i].out
  }
  return output
}
