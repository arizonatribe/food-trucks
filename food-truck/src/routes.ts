import { Router } from "express"
import { Middleware } from "./middleware"

const router = Router()

/**
 * Binds middleware to endpoints for an instance of the express application router.
 *
 * @function
 * @name createRoutes
 * @param {Middleware} middleware A set of middleware functions which will be bound to routes
 * @returns {Router} An instance of the [Express Router](https://expressjs.com/en/api.html#router)
 */
function createRoutes(middleware: Middleware) {
  const {
    healthCheck,
    fetchAll,
    getById,
    reportByType,
    reportByBlock,
    reportByStatus,
    searchByType,
    searchByBlock,
    searchByStatus,
    searchByItem
  } = middleware

  return router
    .get("/healthcheck", healthCheck)
    .get("/food-trucks", fetchAll)
    .get("/food-trucks/:id", getById)
    .get("/report/type", reportByType)
    .get("/report/status", reportByStatus)
    .get("/report/block", reportByBlock)
    .get("/search/type", searchByType)
    .get("/search/status", searchByStatus)
    .get("/search/block", searchByBlock)
    .get("/search/food", searchByItem)
}

export default createRoutes
