type SpecValue =
  | string
  | number
  | boolean
  | NumberConstructor
  | StringConstructor
  | BooleanConstructor
  | undefined

type EnvVarValue = string | undefined

type Spec = {
  [key: string]: SpecValue
}

type EnvVars = {
  [key: string]: EnvVarValue
}

type ConcreteKey<T> = T extends NumberConstructor
  ? number
  : T extends StringConstructor
  ? string
  : T extends BooleanConstructor
  ? boolean
  : T extends boolean
  ? boolean
  : T extends undefined
  ? string | undefined
  : T

type ParsedConfig<T> = {
  [k in keyof T]: ConcreteKey<T[k]>
}

function toNumber(key: string, value: string): number {
  const newValue = Number(value)
  if (Number.isNaN(newValue)) {
    throw new Error(`property ${key} is not a number`)
  }
  return newValue
}
function toBoolean(key: string, value: string): boolean {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  throw new Error(`property ${key} is not a boolean`)
}
function parseValue(
  key: string,
  spec: SpecValue,
  rawValue: EnvVarValue
): number | string | boolean | undefined {
  if (
    rawValue === undefined &&
    (spec === String || spec === Number || spec === Boolean)
  ) {
    throw new Error(`missing property ${key}`)
  }
  if (
    rawValue === undefined &&
    (typeof spec === 'string' ||
      typeof spec === 'number' ||
      typeof spec === 'boolean')
  ) {
    return spec
  }
  if (
    rawValue !== undefined &&
    typeof rawValue === 'string' &&
    (typeof spec === 'string' || spec === String)
  ) {
    return rawValue
  }
  if (
    rawValue !== undefined &&
    typeof rawValue === 'string' &&
    (typeof spec === 'number' || spec === Number)
  ) {
    return toNumber(key, rawValue)
  }

  if (
    rawValue !== undefined &&
    typeof rawValue === 'string' &&
    (typeof spec === 'boolean' || spec === Boolean)
  ) {
    return toBoolean(key, rawValue)
  }

  if (spec === undefined) {
    return rawValue
  }

  throw new Error(
    `Cannot proces ${key} with input ${String(rawValue)} with Spec ${String(
      spec
    )}. This should be unreachable in typescript`
  )
}

const Config = <T extends Spec>(
  processEnv: EnvVars,
  spec: T
): ParsedConfig<T> =>
  Object.entries(spec).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: parseValue(key, value, processEnv[key]),
    }),
    {}
  ) as ParsedConfig<T>
export default Config
