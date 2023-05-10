import { CSV_COLUMNS, NUMERIC_FIELDS, FoodTruck } from "./types"
import { parseCsv } from "../util"

/**
 * Coerces the contents of a structured CSV file to the domain data
 *
 * @function
 * @name toDomainData
 * @param {string} csvPath The path to the CSV source file
 * @returns {Array<FoodTruck>} A list of data domain objects
 */
export function toDomainData(csvPath: string) {
  return parseCsv<FoodTruck>(csvPath, CSV_COLUMNS, NUMERIC_FIELDS)
}

export function createDomainDataClient(csvPath: string) {
  const data = toDomainData(csvPath)

  // TODO: Define methods to query the data in a meaningful way
}
