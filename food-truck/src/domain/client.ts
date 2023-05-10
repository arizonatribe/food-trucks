import { CSV_COLUMNS, NUMERIC_FIELDS, FoodTruck, FoodTruckCollection } from "./types"
import { parseCsv, clone } from "../util"
import { PermitStatus } from "."

/**
 * Coerces the contents of a structured CSV file to the domain data
 *
 * @function
 * @name toDomainData
 * @param {string} csvPath The path to the CSV source file
 * @returns {FoodTruckCollection} A hash-map of data domain objects
 */
export function toDomainData(csvPath: string): FoodTruckCollection {
  const items = parseCsv<FoodTruck>(csvPath, CSV_COLUMNS, NUMERIC_FIELDS)
  const dataGraph = {} as FoodTruckCollection
  for (let i = 0, len = items.length; i < len; i++) {
    dataGraph[items[i].proprietor.id] = items[i]
  }
  return dataGraph
}

/**
 * A factory function which creates an instance of the data domain client.
 * The data can be then queried in several meaningful ways
 *
 * @function
 * @name createDomainDataClient
 * @param {string} csvPath The path to the CSV source file
 * @returns {DomainClient} The domain data client
 */
export function createDomainDataClient(csvPath: string) {
  const data = toDomainData(csvPath)

  /**
   * A function which performs most of the work of counting records by a given field path
   *
   * @private
   * @function
   * @name _reportBy
   * @param {[string, string]} fieldPath A path to the top-level field and its nested field path
   * @returns {Object<string, number>} An object which reports on the number of occurrences of each unique value for the given field path
   */
  function _reportBy(fieldPath: [string, string]) {
    const report = {} as { [type: string]: number }
    Object.values(data).forEach((d) => {
      const field = d[fieldPath[0]][fieldPath[1]]
      if (field != null && field !== "") {
        if (report[field] === undefined) {
          report[field] = 0
        }
        report[field] += 1
      }
    })
    return report
  }

  /**
   * A function which performs most of the work of filtering records by a given field path
   *
   * @private
   * @function
   * @name _searchBy
   * @param {string} q The search value
   * @param {[string, string]} fieldPath A path to the top-level field and its nested field path
   * @returns {Array<FoodTruck>} A list of all the matches to the search for the given field path
   */
  function _searchBy(q: string, fieldPath: [string, string]) {
    const pattern = new RegExp(`${q}`, "i")
    return Object.values(data).filter((d) => pattern.test(d[fieldPath[0]][fieldPath[1]]))
  }

  const client = {
    async getById(id: string) {
      const d = data[id]
      return d != null ? clone(d) : undefined
    },

    async fetchAll() {
      return Object.values(data)
    },

    async searchByName(name: string) {
      return _searchBy(name, ["proprietor", "name"])
    },

    async searchByStatus(status: PermitStatus) {
      return _searchBy(status, ["permit", "status"])
    },

    async searchByType(type: string) {
      return _searchBy(type, ["proprietor", "type"])
    },

    async searchByItem(item: string) {
      return _searchBy(item, ["proprietor", "items"])
    },

    async reportByType() {
      return _reportBy(["proprietor", "type"])
    },

    async reportByStatus() {
      return _reportBy(["permit", "status"])
    }
  }

  return client
}

export type DomainClient = ReturnType<typeof createDomainDataClient>
