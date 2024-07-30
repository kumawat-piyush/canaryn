import { Uri } from 'monaco-editor'
import { configureMonacoYaml, MonacoYaml } from 'monaco-yaml'

// TODO: temporary holds handle (used to update/dispose)
let prevSchema: MonacoYaml

export function addSchema(schemaConfig: any, monaco: any) {
  applySchema(monaco, [schemaConfig])
}

function applySchema(monaco: any, schemas: any) {
  const config = {
    hover: true,
    completion: true,
    enableSchemaRequest: false,
    validate: true,
    schemas: schemas
  }

  if (prevSchema) {
    prevSchema.update(config)
  } else {
    prevSchema = configureMonacoYaml(monaco as any, config)
  }
}

export const schemaIdToUrl = (id: string): string => {
  return Uri.parse(`file://${id}`).toString()
}

export const schemaIdToUri = (id: string): Uri => {
  return Uri.parse(schemaIdToUrl(id))
}
