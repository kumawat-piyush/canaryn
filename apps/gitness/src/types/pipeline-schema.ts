export type Inputs = Record<string, Input>

export interface Input<T = unknown> {
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'array'
    | 'duration'
    | 'choice' // GitHub compatibility
    | 'environment' // GitHub compatibility
    | 'secret'
  description?: string
  default?: T
  required?: boolean
  items?: T[]
  enum?: T[]
  pattern?: string
}

export interface Pipeline {
  pipeline?: {
    inputs?: Inputs
  }
}
