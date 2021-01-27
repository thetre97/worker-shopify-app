export const Method = (method: string) => (req: Request): boolean => req.method.toLowerCase() === method.toLowerCase()

export const Connect = Method('connect')
export const Delete = Method('delete')
export const Get = Method('get')
export const Head = Method('head')
export const Options = Method('options')
export const Patch = Method('patch')
export const Post = Method('post')
export const Put = Method('put')
export const Trace = Method('trace')

export const Header = (header: string, val: string) => (req: Request): boolean => req.headers.get(header) === val
export const Host = (host: string): ((req: Request) => boolean) => Header('host', host.toLowerCase())
export const Referrer = (host: string): ((req: Request) => boolean) => Header('referrer', host.toLowerCase())

export const Path = (regExp: string) => (req: Request): boolean => {
  const url = new URL(req.url)
  const path = url.pathname
  const match = path.match(regExp) || []
  return match[0] === path
}

export interface HandlerFunc {
  (req: Request): Promise<Response>
}

interface ConditionFunc {
  (req: Request): boolean
}

interface Route {
  conditions: Array<ConditionFunc>
  handler: HandlerFunc
}

export default class Router {
  routes: Array<Route>

  constructor() {
    this.routes = []
  }

  handle(conditions: Array<ConditionFunc>, handler: HandlerFunc): void {
    this.routes.push({
      conditions,
      handler
    })
  }

  connect(url: string, handler: HandlerFunc): void {
    return this.handle([Connect, Path(url)], handler)
  }

  delete(url: string, handler: HandlerFunc): void {
    return this.handle([Delete, Path(url)], handler)
  }

  get(url: string, handler: HandlerFunc): void {
    return this.handle([Get, Path(url)], handler)
  }

  head(url: string, handler: HandlerFunc): void {
    return this.handle([Head, Path(url)], handler)
  }

  options(url: string, handler: HandlerFunc): void {
    return this.handle([Options, Path(url)], handler)
  }

  patch(url: string, handler: HandlerFunc): void {
    return this.handle([Patch, Path(url)], handler)
  }

  post(url: string, handler: HandlerFunc): void {
    return this.handle([Post, Path(url)], handler)
  }

  put(url: string, handler: HandlerFunc): void {
    return this.handle([Put, Path(url)], handler)
  }

  trace(url: string, handler: HandlerFunc): void {
    return this.handle([Trace, Path(url)], handler)
  }

  all(url: string, handler: HandlerFunc): void {
    return this.handle([Path(url)], handler)
  }

  async route(req: Request): Promise<Response> {
    const route = this.resolve(req)
    if (route) return route.handler(req)
    return new Response('resource not found', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/plan'
      }
    })
  }

  resolve(req: Request): Route | undefined {
    return this.routes.find((r) => {
      if (!r.conditions || !r.conditions.length) return true
      return r.conditions.every((c) => c(req))
    })
  }
}
