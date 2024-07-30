import { Uri } from 'monaco-editor'
import { configureMonacoYaml, MonacoYaml } from 'monaco-yaml'

// TODO: temporary holds handle (used to dispose)
let prevSchema: MonacoYaml

export function addSchema(schemaConfig: any, monaco: any) {
  if (prevSchema) prevSchema.dispose()
  prevSchema = applySchema(monaco, [schemaConfig])
}

function applySchema(monaco: any, schemas: any) {
  return configureMonacoYaml(monaco as any, {
    hover: true,
    completion: true,
    enableSchemaRequest: false,
    validate: true,
    schemas: schemas
  })
}

export const schemaIdToUrl = (id: string): string => {
  return Uri.parse(`file://${id}`).toString()
}

export const schemaIdToUri = (id: string): Uri => {
  return Uri.parse(schemaIdToUrl(id))
}
