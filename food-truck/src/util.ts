import * as fs from "fs"
import * as path from "path"
import { makeValidator, EnvError } from "envalid"

import { AnyObject } from "./types"

/**
 * Tries to verify a given file/folder path exists
 *
 * @function
 * @name tryPath
 * @param {string} val A possible path to a file or folder
 * @returns {string|undefined} Yields the validated file/folder path or otherwise undefined
 */
export function tryPath(val: string) {
  if (typeof val !== "string" || /^\s*$/.test(val)) return undefined
  if (fs.existsSync(val)) return val
  if (fs.existsSync(path.resolve(process.cwd(), val))) return val
  return undefined
}

/**
 * Validates a given string value represents a valid path to a file
 *
 * @function
 * @name filePath
 * @throws {Error} When the file path is missing or does not exist
 * @param {string} val A string value representing a file path
 * @returns {string} The validated file path
 */
export const filePath = makeValidator<string>((val: string) => {
  const validatedPath = tryPath(val)

  if (validatedPath === undefined) {
    throw new EnvError(`Invalid file/folder path: '${val}'`)
  }

  if (fs.statSync(validatedPath).isDirectory()) {
    throw new EnvError("Must be a path to a file, not a directory")
  }

  return validatedPath
})

/**
 * Converts a value to its numeric equivalent, and force converts non-numeric values to zero
 *
 * @function
 * @name toNumber
 * @param {*} val A value to convert to a number
 * @returns {number} The converted value (zero if the source value was non-numeric)
 */
export function toNumber(val: any): number {
  const num = +val
  return Number.isFinite(num) && !Number.isNaN(num) ? num : 0
}

/**
 * Parses content from a CSV formatted file at a given path
 *
 * @function
 * @name parseCsv
 * @param {string} csvPath A relative or absolute path to a csv file
 * @param {Array<[string, string]>} columnDefinition A mapping which matches a CSV column to a nested field in the return type
 * @param {Array<[string, string]>} numericFields A mapping which identifies any fields which should be converted from string to numeric
 * @returns {Array<Object<string, any>>} The parsed csv content
 */
export function parseCsv<T extends AnyObject>(
  csvPath: string,
  columnDefinition: [string, string][],
  numericFields: [string, string][]
): T[] {
  const content = fs.readFileSync(csvPath, "utf8")
  const csv = content.toString()
  const rows = csv.split(/\n/).slice(1)
  const colLength = columnDefinition.length
  const rowLength = rows.length

  const nestedObjNames = Array.from(new Set(columnDefinition.map((cd) => cd[0])))
  const numOfSubFields = nestedObjNames.length
  const numOfNumericFields = numericFields.length

  const items = Array(rowLength) // array capacity known up-front

  for (let r = 0; r < rowLength; r++) {
    const obj = {} as AnyObject

    // Initialize each object's sub-fields as empty objects
    for (let j = 0; j < numOfSubFields; j++) {
      obj[nestedObjNames[j]] = {}
    }

    // Split the values for each row by the comma delimter
    const values = rows[r].split(",")

    // Set the value for each nested subfield
    for (let i = 0; i < colLength; i++) {
      const subObjName = columnDefinition[i][0]
      const subObjFieldName = columnDefinition[i][1]

      // trim leading/trailing blanks and any blockquotes
      obj[subObjName][subObjFieldName] = values[i]?.replace(/^\s+|"|\s$/g, "")
    }

    // Convert default string values to numeric
    for (let n = 0; n < numOfNumericFields; n++) {
      const subObjName = numericFields[n][0]
      const subObjFieldName = numericFields[n][1]

      obj[subObjName][subObjFieldName] = toNumber(obj[subObjName][subObjFieldName])
    }

    // Add the row to the list
    items[r] = obj
  }

  return items as T[]
}
