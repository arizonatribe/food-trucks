export interface AnyObject {
  [key: string]: any | AnyObject
}

export type ProprietorType = "Truck" | "Push Cart"

export interface Proprietor extends AnyObject {
  id: number
  name: string
  type: ProprietorType
  items: string[]
}

export type PermitStatus = "APPROVED" | "EXPIRED" | "REQUESTED"

export interface Permit extends AnyObject {
  current: string
  prior: number
  status: PermitStatus
  expiresAt: string
  approvedAt: string
  receivedAt: number
  noticeOfInaction?: string
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
  location: string
}

export interface FoodTruck extends AnyObject {
  proprietor: Proprietor
  neighborhood: Neighborhood
  schedule: Schedule
  location: Location
  permit: Permit
}

export type TruckCountByType = {
  [key in ProprietorType]: number
}

export type TruckCountByStatus = {
  [key in PermitStatus]: number
}

export interface TruckCountByBlock {
  [key: number]: number
}

export type QueryStatus = 'loading' | 'error' | 'success' | 'idle';
