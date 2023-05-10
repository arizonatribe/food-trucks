import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import './Map.css';

const defaultCenter: LatLngTuple = [37.7749, -122.4194];
const defaultZoom = 11;

function LeafletMap() {
  return (
    <MapContainer className="Map" scrollWheelZoom={false} center={defaultCenter} zoom={defaultZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default LeafletMap
