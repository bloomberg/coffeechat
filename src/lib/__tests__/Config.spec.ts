import Config from '../Config'

describe('config', () => {
  describe('when a configuration is complete', () => {
    it('overrides values', () => {
      expect(
        Config(
          {
            stringDefaultValOverride: 'Hugo',
            numberDefaultValOverride: '4',
            booleanDefaultValOverride: 'false',
          },
          {
            stringDefaultValOverride: 'Alex',
            numberDefaultValOverride: 3,
            booleanDefaultValOverride: true,
          }
        )
      ).toEqual({
        stringDefaultValOverride: 'Hugo',
        numberDefaultValOverride: 4,
        booleanDefaultValOverride: false,
      })
    })
    it('parses values', () => {
      expect(
        Config(
          {
            numberConstructor: '5',
            stringConstructor: 'foo',
            booleanConstructor: 'true',
            booleanConstructorFalse: 'false',
          },
          {
            numberConstructor: Number,
            stringConstructor: String,
            booleanConstructor: Boolean,
            booleanConstructorFalse: Boolean,
          }
        )
      ).toEqual({
        numberConstructor: 5,
        stringConstructor: 'foo',
        booleanConstructor: true,
        booleanConstructorFalse: false,
      })
    })
    it('gets a config from a mixed spec', () => {
      // declare expected type
      // to verify dynamic typing works
      const result: {
        numberConstructor: number
        numberDefaultValOverride: number
        stringConstructor: string
        stringDefaultValOverride: string
        booleanConstructor: boolean
        booleanDefaultValue: boolean
        undefinedMissing?: string
        undefinedFound?: string
      } = Config(
        {
          numberConstructor: '5',
          numberDefaultValOverride: '4',
          stringConstructor: 'foo',
          stringDefaultValOverride: 'Hugo',
          booleanConstructor: 'true',
          booleanDefaultValue: 'false',
          undefinedMissing: undefined,
          undefinedFound: undefined,
        },
        {
          numberConstructor: Number,
          stringConstructor: String,
          stringDefaultVal: 'world',
          numberDefaultVal: 2,
          stringDefaultValOverride: 'Alex',
          numberDefaultValOverride: 3,
          booleanConstructor: Boolean,
          booleanDefaultValue: true,
          undefinedFound: 'hello',
        }
      )
      expect(result).toEqual({
        numberConstructor: 5,
        stringConstructor: 'foo',
        stringDefaultVal: 'world',
        numberDefaultVal: 2,
        stringDefaultValOverride: 'Hugo',
        numberDefaultValOverride: 4,
        booleanConstructor: true,
        booleanDefaultValue: false,
        undefinedFound: 'hello',
      })
    })
  })

  describe('default and override do not match', () => {
    describe('expecting a number', () => {
      it('throws an error', () => {
        expect(() =>
          Config({ numberDefault: 'meh' }, { numberDefault: 2 })
        ).toThrow('property numberDefault is not a number')
      })
    })
    describe('expecting a boolean', () => {
      it('throws an error', () => {
        expect(() =>
          Config({ booleanDefault: 'meh' }, { booleanDefault: true })
        ).toThrow('property booleanDefault is not a boolean')
      })
    })
  })

  describe('when a configuration is missing values', () => {
    describe('when using a default', () => {
      it('uses default', () => {
        expect(
          Config(
            {},
            {
              stringDefaultVal: 'world',
              numberDefaultVal: 2,
              booleanDefaultVal: true,
            }
          )
        ).toEqual({
          stringDefaultVal: 'world',
          numberDefaultVal: 2,
          booleanDefaultVal: true,
        })
      })
    })
    describe('when using constructors', () => {
      it('errors when a string property is missing', () => {
        expect(() => Config({}, { iAmAString: String })).toThrow(
          'missing property iAmAString'
        )
      })
      it('errors when a Number property is missing', () => {
        expect(() => Config({}, { iAmANumber: Number })).toThrow(
          'missing property iAmANumber'
        )
      })
      it('errors when a Boolean property is missing', () => {
        expect(() => Config({}, { iAmBoolean: Boolean })).toThrow(
          'missing property iAmBoolean'
        )
      })
    })
  })
})
