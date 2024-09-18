import { get, isArray, isEmpty, isObject, isString, isUndefined, omitBy } from 'lodash-es'

export function objectToArrayInputTransformer() {
  return function (value: Record<string, unknown>, _values: Record<string, unknown>) {
    if (typeof value === 'undefined') return undefined
    if (!value) return { value }

    return {
      value: Object.getOwnPropertyNames(value).map(key => {
        return { key, value: value[key] }
      })
    }
  }
}

export function arrayToObjectOutputTransformer(options?: { unsetIfEmpty?: boolean }) {
  return function (value: { key: string; value: unknown }[], _values: Record<string, unknown>) {
    if (typeof value === 'undefined') return undefined
    if (!value) return { value }

    const retObj = {
      value: value.reduce((acc, rowValue) => {
        return { ...acc, [rowValue.key]: rowValue.value }
      }, {})
    }

    if (options?.unsetIfEmpty && Object.getOwnPropertyNames(retObj.value).length === 0) {
      return { value: undefined }
    }

    return retObj
  }
}

export function unsetEmptyArrayOutputTransformer() {
  return function (value: unknown, _values: Record<string, unknown>) {
    if (isArray(value) && isEmpty(value)) {
      return { value: undefined }
    }

    return { value }
  }
}

export function unsetEmptyObjectOutputTransformer() {
  return function (value: unknown, _values: Record<string, unknown>) {
    if (isObject(value)) {
      const cleanObj = omitBy(value, isUndefined)
      if (isEmpty(cleanObj)) {
        return { value: undefined }
      }
    }

    return { value }
  }
}

export function unsetEmptyStringOutputTransformer() {
  return function (value: unknown, _values: Record<string, unknown>) {
    if (isString(value) && isEmpty(value)) {
      return { value: undefined }
    }

    return { value }
  }
}

export function shorthandObjectInputTransformer(parentPath: string) {
  return function (value: unknown, values: Record<string, unknown>) {
    const parentStr = get(values, parentPath)

    if (typeof parentStr === 'string') {
      return { value: parentStr }
    }

    return { value }
  }
}

export function shorthandObjectOutputTransformer(parentPath: string) {
  return function (value: unknown, values: Record<string, unknown>) {
    if (typeof value === 'undefined') return undefined
    if (!value) return { value }

    const parentObj = get(values, parentPath)

    if (typeof parentObj === 'object') {
      const cleanParentObj = omitBy(parentObj, isUndefined)
      if (Object.getOwnPropertyNames(cleanParentObj).length === 1) {
        return { value, path: 'run' }
      }
    }

    return { value }
  }
}
