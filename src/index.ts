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

export * from './force/template'

 /**
  * Utility methods
  */
export * from './utils/time'

/**
 * Types
 */
export * from './types/error'
export * from './types/auth-token'
// export * from '@dfuse/client/dist/types/types/transaction'