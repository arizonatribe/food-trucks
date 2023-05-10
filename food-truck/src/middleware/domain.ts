import { Logger } from "pino"
import { Request, Response, NextFunction } from "express"

import { toDomainData, DomainConfig } from "../domain"

/**
 * A factory function which creates middleware which handles the data domain.
 *
 * @function
 * @name createDomainMiddleware
 * @param {DomainConfig} config The application configuration settings
 * @param {Logger} logger An instance of a threshold-based logger
 * @returns {DomainMiddleware} The food trucks middleware functions ready to be bound to the app
 */
function createDomainMiddleware(config: DomainConfig, logger: Logger) {
  const { csvPath } = config

  /**
   * Reads the CSV formatted data from the food truck data file
   *
   * @function
   * @name readCsv
   * @param {Request} _req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which normally pushes execution forward but is unused here at a catch-all function
   */
  function readCsv(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = toDomainData(csvPath)

      logger.debug(data)

      res.status(200).json({
        success: true,
        status: "OK",
        data
      })
    } catch (err) {
      next(err)
    }
  }

  return {
    readCsv
  }
}

export type DomainMiddleware = ReturnType<typeof createDomainMiddleware>

export default createDomainMiddleware
