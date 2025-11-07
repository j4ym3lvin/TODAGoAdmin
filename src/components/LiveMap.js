// LiveMap.js
import React, { useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import driverIconImg from "../assets/driver-icon.png";
import todaIconImg from "../assets/toda-icon.png";

const driverIcon = new L.Icon({ iconUrl: driverIconImg, iconSize: [42, 38], iconAnchor: [21, 38] });
const todaIcon   = new L.Icon({ iconUrl: todaIconImg,   iconSize: [46, 46], iconAnchor: [23, 46] });

function FitToData({ points = [] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 17 });
  }, [points, map]);
  return null;
}

function Focus({ focus, onDone }) {
  const map = useMap();
  useEffect(() => {
    if (!focus) return;
    const { lat, lng } = focus;
    map.flyTo([lat, lng], 17, { duration: 0.6 });
    // call onDone to clear selection after fly
    onDone?.();
  }, [focus, map, onDone]);
  return null;
}

export default function LiveMap({ drivers = [], todaLocations = [], focus, onFocused }) {
  const allPoints = useMemo(() => {
    const p = [];
    drivers.forEach(d => Number.isFinite(d.latitude) && Number.isFinite(d.longitude) && p.push([d.latitude, d.longitude]));
    todaLocations.forEach(t => Number.isFinite(t.latitude) && Number.isFinite(t.longitude) && p.push([t.latitude, t.longitude]));
    return p;
  }, [drivers, todaLocations]);

  return (
    <MapContainer center={[13.9417, 121.6236]} zoom={14} style={{ height: 480, width: "100%", borderRadius: 12 }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitToData points={allPoints} />
      <Focus focus={focus} onDone={onFocused} />

      {drivers.map((d, i) => (
        <Marker key={`drv-${i}`} position={[d.latitude, d.longitude]} icon={driverIcon}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <b>{d.name || "Driver"}</b><br />
              Status: {d.status || "—"}<br />
              TODA: {d.toda || "—"}
            </div>
          </Popup>
        </Marker>
      ))}

      {todaLocations.map((t, i) => (
        <Marker key={`toda-${i}`} position={[t.latitude, t.longitude]} icon={todaIcon}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <b>{t.name || "TODA"}</b><br />
              {t.street ? `${t.street}, ` : ""}{t.barangay || ""}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
