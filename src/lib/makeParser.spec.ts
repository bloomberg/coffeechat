import makeParser, { ParseError } from './makeParser'

describe('makeParser', () => {
  it('should return a parser which returns valid objects unmodified', () => {
    const parse = makeParser<{ foo: string }>({
      type: 'object',
      properties: {
        foo: { type: 'string' },
      },
      required: [],
    })
    const res = parse({ foo: 'bar' })
    expect(res).toEqual({ foo: 'bar' })
  })

  it('should return a parser which coerces properties into the intended type', () => {
    type Shape = { num: number; bool: boolean }
    const parse = makeParser<Shape>({
      type: 'object',
      properties: {
        num: { type: 'number' },
        bool: { type: 'boolean' },
      },
      required: [],
    })
    const res = parse(({ num: '5', bool: 'true' } as unknown) as Shape)
    expect(res).toEqual({ num: 5, bool: true })
  })

  it('should return a parser which provides defaults where specified', () => {
    type Shape = { foo: string }
    const parse = makeParser<Shape>({
      type: 'object',
      properties: {
        foo: { type: 'string', default: 'bar' },
      },
      required: [],
    })
    const res = parse(({} as unknown) as Shape)
    expect(res).toEqual({ foo: 'bar' })
  })

  describe('errors', () => {
    // We neeed to use a try/expect approach for these (as opposed to
    // expect.toThrow()) because we need to check a property on the errors, and
    // expect.toThrow() only checks the message.
    /* eslint-disable jest/no-conditional-expect, jest/no-try-expect */

    it('should return a parser which throws an error when a supplied property is not of the correct type', () => {
      type Shape = { bool: boolean }
      const parse = makeParser<Shape>({
        type: 'object',
        properties: {
          bool: { type: 'boolean' },
        },
        required: [],
      })

      expect.assertions(2)
      try {
        parse(({ bool: 'hello' } as unknown) as Shape)
      } catch (e) {
        expect(e).toBeInstanceOf(ParseError)
        expect((e as ParseError).errors).toEqual([
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
      type Shape = { bool: boolean }
      const parse = makeParser<Shape>({
        type: 'object',
        properties: {
          bool: { type: 'boolean' },
        },
        required: ['bool'],
      })

      expect.assertions(2)
      try {
        parse(({} as unknown) as Shape)
      } catch (e) {
        expect(e).toBeInstanceOf(ParseError)
        expect((e as ParseError).errors).toEqual([
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
