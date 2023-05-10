import { Logger } from "pino"
import { DomainConfig } from "../domain"
import { AppConfig, ServerConfig } from "../config"
import createBasicMiddleware, { BasicMiddleware } from "./basic"
import createDomainMiddleware, { DomainMiddleware } from "./domain"
import createDocsMiddleware, { DocsMiddleware } from "./docs"

export interface Middleware extends BasicMiddleware, DomainMiddleware, DocsMiddleware { }

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
  const docs = createDocsMiddleware(config.openApi, logger)

  return { ...basic, ...domain, ...docs } as Middleware
}

export default createMiddleware
