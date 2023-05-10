import { Router } from "express"
import { Middleware } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     FoodTruckTypeReport:
 *       type: object
 *       properties:
 *         Truck:
 *           type: number
 *         PushCart:
 *           type: number
 *     PermitStatusReport:
 *       type: object
 *       properties:
 *         EXPIRED:
 *           type: number
 *         APPROVED:
 *           type: number
 *         REQUESTED:
 *           type: number
 *     FoodTruck:
 *       type: object
 *       properties:
 *         proprietor:
 *           $ref: '#/components/schemas/Proprietor'
 *         neighborhood:
 *           $ref: '#/components/schemas/Neighborhood'
 *         schedule:
 *           $ref: '#/components/schemas/Schedule'
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         permit:
 *           $ref: '#/components/schemas/Permit'
 *     Proprietor:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: string
 *     Schedule:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         daysHours:
 *           type: string
 *     Neighborhood:
 *       type: object
 *       properties:
 *         lot:
 *           type: number
 *         block:
 *           type: number
 *         blocklot:
 *           type: number
 *         zipCodes:
 *           type: number
 *         neighborhoods:
 *           type: number
 *         policeDistricts:
 *           type: number
 *         supervisorDistricts:
 *           type: number
 *         firePreventionDistricts:
 *           type: number
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         description:
 *           type: number
 *         address:
 *           type: number
 *         x:
 *           type: number
 *         y:
 *           type: number
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         location:
 *           type: string
 *     Permit:
 *       type: object
 *       properties:
 *         current:
 *           type: number
 *         prior:
 *           type: number
 *         status:
 *           type: string
 *         expiresAt:
 *           type: string
 *         approvedAt:
 *           type: string
 *         receivedAt:
 *           type: number
 *         noticeOfInaction:
 *           type: string
 */

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
    searchByItem,
    searchByName,
    serveDocs,
    setupDocs
  } = middleware

  router.use("/docs", serveDocs, setupDocs)

  return router
    /**
     * @swagger
     * /healthcheck:
     *   get:
     *     summary: Service health check
     *     responses:
     *       200:
     *         description: Uptime and other basic health stats
     */
    .get("/healthcheck", healthCheck)

    /**
     * @swagger
     * /food-trucks:
     *   get:
     *     summary: Retrieves a full list of Food Trucks
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     */
    .get("/food-trucks", fetchAll)

    /**
     * @swagger
     * /food-trucks/:id:
     *   get:
     *     summary: Retrieves a Food Truck by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: CNN of the Food Truck proprietor
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     *       404:
     *         description: No match for the given ID
     */
    .get("/food-trucks/:id", getById)

    /**
     * @swagger
     * /report/type:
     *   get:
     *     summary: Retrieves a report of Food Trucks by type (Truck, Push Cart, etc)
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruckTypeReport'
     */
    .get("/report/type", reportByType)

    /**
     * @swagger
     * /report/status:
     *   get:
     *     summary: Retrieves a report of Food Trucks by their permit status (expired, requested, etc.)
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PermitStatusReport'
     */
    .get("/report/status", reportByStatus)

    /**
     * @swagger
     * /report/block:
     *   get:
     *     summary: Retrieves a report of Food Trucks by their block
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruckTypeReport'
     */
    .get("/report/block", reportByBlock)

    /**
     * @swagger
     * /search/type:
     *   get:
     *     summary: Searches for a list of Food Trucks by their type
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         required: true
     *         description: The type of proprietor ('Truck', 'Push Cart')
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     *       204:
     *         description: No matches
     */
    .get("/search/type", searchByType)

    /**
     * @swagger
     * /search/status:
     *   get:
     *     summary: Searches for a list of Food Trucks by their permit status
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         required: true
     *         description: The permit status ('APPROVED', 'EXPIRED', 'REQUESTED')
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     *       204:
     *         description: No matches
     */
    .get("/search/status", searchByStatus)

    /**
     * @swagger
     * /search/block:
     *   get:
     *     summary: Searches for a list of Food Trucks by their block
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: number
     *         required: true
     *         description: The block number
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     *       204:
     *         description: No matches
     */
    .get("/search/block", searchByBlock)

    /**
     * @swagger
     * /search/food:
     *   get:
     *     summary: Searches for a list of Food Trucks by their food items
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         required: true
     *         description: Any kind of food item a proprietor may sell
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     *       204:
     *         description: No matches
     */
    .get("/search/food", searchByItem)

    /**
     * @swagger
     * /search/truck:
     *   get:
     *     summary: Searches for one or more Food Trucks by name
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         required: true
     *         description: A partial or full name of a Food Truck proprietor
     *     responses:
     *       200:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FoodTruck'
     *       204:
     *         description: No matches
     */
    .get("/search/truck", searchByName)
}

export default createRoutes
