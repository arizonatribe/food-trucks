import { AnyObject } from "../types"
import { filePath } from "../util"

/**
 * The domain related environment variables
 *
 * @interface
 * @typedef {Object<string, string>} DomainEnv
 * @property {string} [CSV_PATH=data/data.csv] The file path for the CSV data containing the domain data
 */
export interface DomainEnv {
  CSV_PATH: string
}

/**
 * Environment variable schema validators for the domain logic
 *
 * @interface
 * @typedef {Object<string, any>} DomainEnvValidators
 * @property {function} CSV_PATH A validator function - used by [envalid](https://npmjs.com/package/envalid) - to validate and/or set defaults for the CSV_PATH env var
 */
export const DomainEnvValidators = {
  CSV_PATH: filePath({
    desc: "The file path for the CSV data containing the domain data",
    default: "data/data.csv"
  })
}

/**
 * The domain logic configuration object
 *
 * @interface
 * @typedef {Object<string, string>} DomainConfig
 * @property {string} csvPath The file path for the CSV data containing the domain data
 */
export interface DomainConfig {
  csvPath: string
}

export type ProprietorType = "Truck" | "Push Cart"

export interface Proprietor extends AnyObject {
  id: number
  name: string
  type: ProprietorType
  items: string[]
}

export interface Schedule extends AnyObject {
  description: string
  daysHours?: string
}

export interface Neighborhood extends AnyObject {
  lot: number
  block: number
  blocklot: number
  zipCodes: number
  neighborhoods: number
  policeDistricts: number
  supervisorDistricts: number
  firePreventionDistricts: number
}

export interface Location extends AnyObject {
  id: number
  description: number
  address: string
  x: number
  y: number
  latitude: number
  longitude: number
  location: string // (lat,lon)
}

export type PermitStatus = "APPROVED" | "EXPIRED" | "REQUESTED"

export interface Permit extends AnyObject {
  current: string
  prior: number
  status: PermitStatus
  expiresAt: string // datetime
  approvedAt: string // datetime
  receivedAt: number // yyyyMMdd
  noticeOfInaction?: string
}

export interface FoodTruck extends AnyObject {
  proprietor: Proprietor
  neighborhood: Neighborhood
  schedule: Schedule
  location: Location
  permit: Permit
}

export interface FoodTruckCollection extends AnyObject {
  [id: string]: FoodTruck
}

export const CSV_COLUMNS: Array<[string, string]> = [
  ["location", "id"],
  ["proprietor", "name"],
  ["proprietor", "type"],
  ["proprietor", "id"],
  ["location", "description"],
  ["location", "address"],
  ["neighborhood", "blocklot"],
  ["neighborhood", "block"],
  ["neighborhood", "lot"],
  ["permit", "current"],
  ["permit", "status"],
  ["proprietor", "items"],
  ["location", "x"],
  ["location", "y"],
  ["location", "latitude"],
  ["location", "longitude"],
  ["schedule", "description"],
  ["schedule", "daysHours"],
  ["permit", "noticeOfInaction"],
  ["permit", "approvedAt"],
  ["permit", "receivedAt"],
  ["permit", "prior"],
  ["permit", "expiresAt"],
  ["location", "location"],
  ["neighborhood", "firePreventionDistricts"],
  ["neighborhood", "policeDistricts"],
  ["neighborhood", "supervisorDistricts"],
  ["neighborhood", "zipCodes"],
  ["neighborhood", "neighborhoods"]
]

export const NUMERIC_FIELDS: Array<[string, string]> = [
  ["proprietor", "id"],
  ["neighborhood", "lot"],
  ["neighborhood", "block"],
  ["neighborhood", "blocklot"],
  ["neighborhood", "zipCodes"],
  ["neighborhood", "neighborhoods"],
  ["neighborhood", "policeDistricts"],
  ["neighborhood", "supervisorDistricts"],
  ["neighborhood", "firePreventionDistricts"],
  ["location", "id"],
  ["location", "description"],
  ["location", "x"],
  ["location", "y"],
  ["location", "latitude"],
  ["location", "longitude"],
  ["permit", "prior"],
  ["permit", "receivedAt"]
]

export const LIST_FIELDS: Array<[string, string]> = [["proprietor", "items"]]
