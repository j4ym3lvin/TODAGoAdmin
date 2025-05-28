import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import driverIconImg from "../assets/driver-icon.png";
import todaIconImg from "../assets/toda-icon.png";

// Example custom icon for drivers
const driverIcon = new L.Icon({
  iconUrl: driverIconImg, // use the imported image
  iconSize: [50, 45],     // adjust size if needed!
  iconAnchor: [15, 45],
});

const todaIcon = new L.Icon({
  iconUrl: todaIconImg,
  iconSize: [50, 50],   // adjust size as needed
  iconAnchor: [15, 45], // center the icon
});


export default function LiveMap({ drivers, todaLocations }) {
  return (
    <MapContainer center={[13.9417, 121.6236]} zoom={15} style={{ height: "400px", width: "100%", borderRadius: "10px" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {drivers.map((d, idx) => (
        <Marker key={idx} position={[d.latitude, d.longitude]} icon={driverIcon}>
          <Popup>
            Driver: {d.name}<br />
            Status: {d.status}
          </Popup>
        </Marker>
      ))}
      {todaLocations.map((t, idx) => (
        <Marker key={idx} position={[t.latitude, t.longitude]} icon={todaIcon}>
          <Popup>
            TODA: {t.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
