import { Logger } from "pino"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import { OpenApiConfig } from "../config"

/**
 * A factory function which creates middleware which handles application documentation
 *
 * @function
 * @name createDocsMiddleware
 * @param {OpenApiConfig} config The Open API configuration settings
 * @param {Logger} _logger An instance of a threshold-based logger
 * @returns {DocsMiddleware} The middleware functions ready to be bound to the app
 */
function createDocsMiddleware(config: OpenApiConfig, _logger: Logger) {
  const docs = swaggerJsdoc(config)

  return {
    serveDocs: swaggerUi.serve,
    setupDocs: swaggerUi.setup(docs)
  }
}

export type DocsMiddleware = ReturnType<typeof createDocsMiddleware>

export default createDocsMiddleware

