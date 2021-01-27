import Router from './router'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { handleCallback, handleInstall } from './handlers'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event: FetchEvent): Promise<Response> {
  const r = new Router()

  r.get('/install', handleInstall)
  r.get('/callback', handleCallback)

  r.get('.*', () => getAssetFromKV(event))

  const resp = await r.route(event.request)
  return resp
}
