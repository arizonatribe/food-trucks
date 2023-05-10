import { Level } from "pino"
import env from "./env"
import { DomainConfig } from "../domain"

const pkg = require("../../package.json")

export interface ServerConfig {
  apiVersion: string
  name: string
  host: string
  isProduction: boolean
  level: Level
  port: number
  shouldPrettyPrint: boolean
  version: string
}

export interface OpenApiConfig {
  definition: {
    openapi: string
    info: {
      title: string
      version: string
      description: string
      license: {
        name: string
        url?: string
      }
      contact: {
        name: string
        url?: string
        email: string
      }
    }
    servers: { url: string }[]
  }
  apis: string[]
}

export interface AppConfig extends ServerConfig, DomainConfig {
  openApi: OpenApiConfig
}

const apiVersion = `v${pkg.version.split(".")[0]}`

const openApi = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: pkg.description,
      version: pkg.version,
      license: {
        name: pkg.license
      },
      contact: {
        name: pkg.author.split(/</)[0],
        email: pkg.author.match(/[^<]+<([^>]+)>/)[1]
      }
    },
    servers: [{ url: `http://${env.HOST}:${env.PORT}/${apiVersion}` }]
  },
  apis: ["./lib/routes.js", "./src/routes.ts"]
} as OpenApiConfig

export const config = {
  name: pkg.name,
  apiVersion,
  version: pkg.version,
  shouldPrettyPrint: env.PRETTY_PRINT,
  host: env.HOST,
  port: env.PORT,
  csvPath: env.CSV_PATH,
  level: env.LOG_LEVEL,
  isProduction: env.NODE_ENV === "production",
  openApi
} as AppConfig

export default config
