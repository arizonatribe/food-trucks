import { Logger } from "pino"
import { DomainConfig } from "../domain"
import { AppConfig, ServerConfig } from "../config"
import createBasicMiddleware, { BasicMiddleware } from "./basic"
import createDomainMiddleware, { DomainMiddleware } from "./domain"

export interface Middleware extends BasicMiddleware, DomainMiddleware {}

/**
 * A factory function which creates all the app and common middleware
 *
 * @function
 * @name createMiddleware
 * @param {AppConfig} config The application configuration settings
 * @param {Logger} logger An instance of a threshold-based logger
 * @returns {Middleware} All the server's middleware functions
 */
function createMiddleware(config: AppConfig, logger: Logger) {
  const basic = createBasicMiddleware(config as ServerConfig, logger)
  const domain = createDomainMiddleware(config as DomainConfig, logger)

  return { ...basic, ...domain } as Middleware
}

export default createMiddleware
