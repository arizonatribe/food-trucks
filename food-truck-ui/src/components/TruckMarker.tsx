import React from "react"
import { Marker, Popup } from "react-leaflet"
import "./TruckMarker.css"
import { Location, Proprietor, Schedule } from "./api"

interface Props {
  loc: Location
  truck: Proprietor
  schedule: Schedule
}

function TruckMarker(props: Props) {
  const { loc, truck, schedule } = props
  return (
    <Marker position={[loc.latitude, loc.longitude]}>
      <Popup>
        <h3>
          {truck.type === "Truck" ? "🚚" : "🛒"} {truck.name}
        </h3>
        <p>{truck.items?.join(", ")}</p>
        <address>{loc.address}</address>
        <p>{schedule.daysHours}</p>
      </Popup>
    </Marker>
  )
}

export default TruckMarker
