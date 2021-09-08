import Debug from 'debug'

export function makeDebug(path: string): Debug.Debugger {
  return Debug(`coffeechat:${path}`)
}
