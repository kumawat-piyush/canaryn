import { RefObject, useEffect } from 'react'
import * as monaco from 'monaco-editor'

import { addSchema, schemaIdToUrl } from '../utils/schema-utils'

export type UseSchema = (arg: {
  monaco: typeof monaco | null | undefined
  schemaConfig?: { schema: any; uri: string }
  instanceId: string
}) => void

export const useSchema: UseSchema = (props): void => {
  const { monaco, schemaConfig, instanceId } = props

  useEffect(() => {
    if (monaco && schemaConfig?.schema) {
      addSchema(
        {
          // If YAML file is opened matching this glob
          fileMatch: [schemaIdToUrl(instanceId.toString())],
          ...schemaConfig
        },
        monaco
      )
    }
  }, [monaco, schemaConfig?.schema, instanceId])
}
