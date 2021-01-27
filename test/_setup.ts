// set up global namespace for worker environment
import * as makeServiceWorkerEnv from 'service-worker-mock'
declare let global: unknown
Object.assign(global, makeServiceWorkerEnv())
