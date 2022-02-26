import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { sowData } from "./util";

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Draw circles */}
        {sowData(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;
