import makeParser, { ParseError } from '../makeParser'

jest.spyOn(global.console, 'error').mockImplementation(() => {})

describe('makeParser', () => {
  it('should return a parser which returns valid objects unmodified', () => {
    const parse = makeParser<{ foo: string }>({
      type: 'object',
      properties: {
        foo: { type: 'string' },
      },
      required: [],
    })
    const result = parse({ foo: 'bar' })
    expect(result).toEqual({ foo: 'bar' })
  })

  it('should return a parser which coerces properties into the intended type', () => {
    const parse = makeParser<{ num: number; bool: boolean }>({
      type: 'object',
      properties: {
        num: { type: 'number' },
        bool: { type: 'boolean' },
      },
      required: [],
    })
    const result = parse({ num: '5', bool: 'true' })
    expect(result).toEqual({ num: 5, bool: true })
  })

  it('should return a parser which provides defaults where specified', () => {
    const parse = makeParser<{ foo: string }>({
      type: 'object',
      properties: {
        foo: { type: 'string', default: 'bar' },
      },
      required: [],
    })
    const result = parse({})
    expect(result).toEqual({ foo: 'bar' })
  })

  describe('errors', () => {
    // We neeed to use a try/expect approach for these (as opposed to
    // expect.toThrow()) because we need to check a property on the errors, and
    // expect.toThrow() only checks the message.
    /* eslint-disable jest/no-conditional-expect, jest/no-try-expect */

    it('should return a parser which throws an error when a supplied property is not of the correct type', () => {
      const parse = makeParser<{ bool: boolean }>({
        type: 'object',
        properties: {
          bool: { type: 'boolean' },
        },
        required: [],
      })

      expect.assertions(2)
      try {
        parse({ bool: 'hello' })
      } catch (error) {
        expect(error).toBeInstanceOf(ParseError)
        expect((error as ParseError).errors).toEqual([
          {
            instancePath: '/bool',
            keyword: 'type',
            message: 'must be boolean',
            params: {
              type: 'boolean',
            },
            schemaPath: '#/properties/bool/type',
          },
        ])
      }
    })

    it('should return a parser which throws an error when a required property is missing', () => {
      const parse = makeParser<{ bool: boolean }>({
        type: 'object',
        properties: {
          bool: { type: 'boolean' },
        },
        required: ['bool'],
      })

      expect.assertions(2)
      try {
        parse({})
      } catch (error) {
        expect(error).toBeInstanceOf(ParseError)
        expect((error as ParseError).errors).toEqual([
          {
            instancePath: '',
            keyword: 'required',
            message: "must have required property 'bool'",
            params: {
              missingProperty: 'bool',
            },
            schemaPath: '#/required',
          },
        ])
      }
    })

    /* eslint-enable jest/no-conditional-expect, jest/no-try-expect */
  })
})
