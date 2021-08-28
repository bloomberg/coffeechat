import Ajv, { JSONSchemaType, ErrorObject } from 'ajv'

const ajv = new Ajv({ coerceTypes: true, useDefaults: true, allErrors: true })

export class ParseError extends Error {
  errors: ErrorObject[] = []

  constructor(errors: ErrorObject[]) {
    super('failed to parse object')
    this.name = 'ParseError'
    this.errors = errors
  }

  toString(): string {
    return JSON.stringify(this.errors, null, 2)
  }
}

/**
 * A function which accepts a schema and returns a 'parse' function for parsing
 * objects against said schema.
 */
export default function makeParser<T>(
  schema: JSONSchemaType<T>
): (object: Record<string, unknown>) => T {
  const validate = ajv.compile(schema)

  return function parse(object: Record<string, unknown>) {
    const clone = JSON.parse(JSON.stringify(object)) as T

    validate(clone)
    if (validate.errors) {
      if (process.env.NODE_ENV !== 'production') {
        // in dev mode the missing properties are not shown and this is very
        // confusing. This will output any time there's an error parsing the env
        // eslint-disable-next-line no-console
        console.error(new ParseError(validate.errors), 'Invalid environment')
      }
      throw new ParseError(validate.errors)
    }

    return clone
  }
}
