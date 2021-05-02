import Ajv, { JSONSchemaType, ErrorObject } from 'ajv'

const ajv = new Ajv({ coerceTypes: true, useDefaults: true })

export class ParseError extends Error {
  errors: ErrorObject[] = []

  constructor(errors: ErrorObject[]) {
    super('failed to parse object')
    this.name = 'ParseError'
    this.errors = errors
  }
}

/**
 * A function which accepts a schema and returns a 'parse' function for parsing
 * objects against said schema.
 */
export default function makeParser<T>(
  schema: JSONSchemaType<T>
): (object: T) => T {
  const validate = ajv.compile(schema)

  return function parse(object: T) {
    const clone = JSON.parse(JSON.stringify(object)) as T

    validate(clone)
    if (validate.errors) {
      throw new ParseError(validate.errors)
    }

    return clone
  }
}
