import { Logger } from "pino"
import { Request, Response, NextFunction } from "express"

import { toNumber } from "../util"
import { createDomainDataClient, DomainConfig, PermitStatus, ProprietorType } from "../domain"

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
  const client = createDomainDataClient(csvPath)

  /**
   * Reports on the type of Food Truck proprietors
   *
   * @function
   * @name reportByType
   * @param {Request} _req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function reportByType(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await client.reportByType()

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

  /**
   * Reports on the permit status of Food Truck proprietors
   *
   * @function
   * @name reportByStatus
   * @param {Request} _req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function reportByStatus(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await client.reportByStatus()

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

  /**
   * Reports on the blocks where Food Truck proprietors are permitted
   *
   * @function
   * @name reportByBlock
   * @param {Request} _req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function reportByBlock(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await client.reportByBlock()

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

  /**
   * Searches for Food Truck proprietors by type
   *
   * @function
   * @name searchByType
   * @param {Request} req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function searchByType(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query?.q ?? req.query?.search ?? ""
      const data = await client.searchByType(search as ProprietorType)

      logger.debug(data)

      if (data.length === 0) {
        res.status(204).json({
          success: true,
          status: "NO CONTENT"
        })
      } else {
        res.status(200).json({
          success: true,
          status: "OK",
          data
        })
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Searches for Food Truck proprietors by their permit status
   *
   * @function
   * @name searchByStatus
   * @param {Request} req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function searchByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query?.q ?? req.query?.search ?? ""
      const data = await client.searchByStatus(search as PermitStatus)

      logger.debug(data)

      if (data.length === 0) {
        res.status(204).json({
          success: true,
          status: "NO CONTENT"
        })
      } else {
        res.status(200).json({
          success: true,
          status: "OK",
          data
        })
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Searches for Food Truck proprietors by block
   *
   * @function
   * @name searchByBlock
   * @param {Request} req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function searchByBlock(req: Request, res: Response, next: NextFunction) {
    try {
      const search = toNumber(req.query?.q ?? req.query?.search)
      const data = await client.searchByBlock(search)

      logger.debug(data)

      if (data.length === 0) {
        res.status(204).json({
          success: true,
          status: "NO CONTENT"
        })
      } else {
        res.status(200).json({
          success: true,
          status: "OK",
          data
        })
      }
    } catch (err) {
      next(err)
    }
  }
  /**
   * Searches for Food Truck proprietors by their food items
   *
   * @function
   * @name searchByItem
   * @param {Request} req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function searchByItem(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query?.q ?? req.query?.search ?? ""
      const data = await client.searchByItem(search as string)

      logger.debug(data)

      if (data.length === 0) {
        res.status(204).json({
          success: true,
          status: "NO CONTENT"
        })
      } else {
        res.status(200).json({
          success: true,
          status: "OK",
          data
        })
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Retrieves the details for a Food Truck proprietor by their unique ID
   *
   * @function
   * @name getById
   * @param {Request} req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params?.id
      const data = await client.getById(id)

      logger.debug({ id, data })

      if (data == null) {
        res.status(404).json({
          success: true,
          status: "NOT FOUND",
          message: `No food truck proprietor matches CNN #${id}`
        })
      } else {
        res.status(200).json({
          success: true,
          status: "OK",
          data
        })
      }
    } catch (err) {
      next(err)
    }
  }

  /**
   * Retrieves the details for all Food Truck proprietors
   *
   * @function
   * @name fetchAll
   * @param {Request} _req The connect middleware HTTP request object
   * @param {Response} res The connect middleware HTTP response object whose methods are used to resolve the middleware chain and send a true HTTP response back to the caller
   * @param {NextFunction} next The `next` middleware function which pushes execution forward
   */
  async function fetchAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await client.fetchAll()

      logger.debug(data)

      if (data.length === 0) {
        res.status(204).json({
          success: true,
          status: "NO CONTENT"
        })
      } else {
        res.status(200).json({
          success: true,
          status: "OK",
          data
        })
      }
    } catch (err) {
      next(err)
    }
  }

  return {
    reportByBlock,
    reportByStatus,
    reportByType,
    searchByStatus,
    searchByType,
    searchByItem,
    searchByBlock,
    fetchAll,
    getById
  }
}

export type DomainMiddleware = ReturnType<typeof createDomainMiddleware>

export default createDomainMiddleware
