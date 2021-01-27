import { expect } from 'chai'
import Router from '../src/router'

function handler(): Promise<Response> {
  const init = {
    headers: { 'content-type': 'application/json' }
  }
  const body = JSON.stringify({ some: 'json' })
  return Promise.resolve(new Response(body, init))
}

async function handleRequest(request: Request): Promise<Response> {
  const r = new Router()

  r.get('.*/bar', () => Promise.resolve(new Response('responding for /bar')))
  r.get('.*/foo', handler)
  r.post('.*/foo.*', handler)
  r.get('/demos/router/buzz', (request) => fetch(request))
  r.all('/', () => Promise.resolve(new Response('Hello worker!! Request method was: ' + request.method)))

  const resp = await r.route(request)
  return resp
}

describe('handler returns response with request method', () => {
  const methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']
  methods.forEach((method) => {
    it(method, async () => {
      const result = await handleRequest(new Request('/', { method }))
      const text = await result.text()
      expect(text).to.include(method)
    })
  })
})
