import crypto from 'crypto'

const scopes = 'write_products'

export const redirectUri = `${SHOPIFY_APP_URL}/callback`

export const buildInstallUrl = (shop: string, state: string): string =>
  `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`

export const buildAccessTokenRequestUrl = (shop: string): string => `https://${shop}/admin/oauth/access_token`

export const buildShopDataRequestUrl = (shop: string): string => `https://${shop}/admin/shop.json`

export const generateEncryptedHash = (params: string): string =>
  crypto.createHmac('sha256', SHOPIFY_API_SECRET).update(params).digest('hex')

interface AccessTokenRequest {
  client_id: string
  client_secret: string
  code: string
}

interface AccessTokenResponse {
  access_token: string
}

export async function fetchAccessToken(shop: string, data: AccessTokenRequest): Promise<AccessTokenResponse> {
  const response = await fetch(buildAccessTokenRequestUrl(shop), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}
