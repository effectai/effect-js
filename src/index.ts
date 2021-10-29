// const path = require('path')
// const fs = require('fs')

// const env = process.env.APP_ENV || process.env.NODE_ENV

// const envPath = path.resolve(__dirname + '../../../', `.env.${env}`)
// const defaultEnvPath = path.resolve(__dirname + '../../../', '.env.development')

// const envFile = fs.existsSync(envPath) ? envPath : defaultEnvPath
// require('dotenv').config({
//   path: envFile
// })

/**
 * 🐰:  Do a Barrel Roll 🛢️🚀
 */

/**
 * Main module
 */
export * from './client/client'

/**
 * Account
 */
export * from './effect-account/effectAccount'

/**
 * Template
 */
export * from './force/force'
export * from './force/template'
export * from './force/templateScript'

/**
 * Configuration
 */
export * from './config/config'


 /**
  * Utility methods
  */
export * from './utils/time'
export * from './utils/bscAddress'
export * from './utils/asset'
export * from './utils/compositeKey'
export * from './utils/hex'

/**
 * Types
 */
export * from './types/error'
export * from './types/auth-token'
export * from './types/client'
export * from './types/effectClientConfig'
export * from './types/transaction'
