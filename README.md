# `workers-shopify-template`

A batteries included template for kick starting a TypeScript Cloudflare worker project, for use in a Shopify App - mostly borrowed from the official TS starter, and this article: [https://medium.com/@chris.dascoli/lets-build-a-shopify-app-c5f075fd6a78](https://medium.com/@chris.dascoli/lets-build-a-shopify-app-c5f075fd6a78) (thanks!).

## 🔋 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To generate using Wrangler, run this command:

```bash
wrangler generate my-app-project https://github.com/thetre97/worker-shopify-template
```

### 👩 💻 Developing

Add your account ID in `wrangler.toml`, and add some env's to Cloudflare:

```sh
wrangler secret put SHOPIFY_APP_URL
wrangler secret put SHOPIFY_API_KEY
wrangler secret put SHOPIFY_API_SECRET
```

And then run `wrangler dev`.

### 🧪 Testing

This template comes with mocha tests which simply test that the request handler can handle each request method. `yarn test` will run your tests.

### ✏️ Linting

This template uses ESLint to lint the project. To invoke, run `yarn lint`.

### 👀 Previewing and Publishing

To publish, just run `wrangler publish`.

## ⚠️ Caveats

The `service-worker-mock` used by the tests is not a perfect representation of the Cloudflare Workers runtime. It is a general approximation. We recommend that you test end to end with `wrangler dev` in addition to a [staging environment](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/environments/) to test things before deploying.
