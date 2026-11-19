import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents, CircleMarker, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 16, { duration: 0.8 });
  }, [center, map]);
  return null;
}

function MapClickHandler({ mode, onPin, onBoundaryPoint }) {
  useMapEvents({
    click(event) {
      const point = [event.latlng.lat, event.latlng.lng];
      if (mode === "pin") onPin(point);
      else onBoundaryPoint(point);
    },
  });
  return null;
}

export default function FarmMap({
  mode,
  pin,
  boundary,
  onPin,
  onBoundaryPoint,
  mapType,
}) {
  const center = useMemo(() => pin || boundary[0] || [20.5937, 78.9629], [pin, boundary]);

  return (
    <div className="agr-map">
      <MapContainer center={center} zoom={pin || boundary.length ? 16 : 5} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        {mapType === "satellite" ? (
          <TileLayer
            attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        <RecenterMap center={pin} />
        <MapClickHandler mode={mode} onPin={onPin} onBoundaryPoint={onBoundaryPoint} />
        {pin && <CircleMarker center={pin} radius={9} pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#1e7a42", fillOpacity: 1 }} />}
        {boundary.length >= 3 && (
          <Polygon positions={boundary} pathOptions={{ color: "#1e7a42", weight: 3, fillColor: "#70b77e", fillOpacity: 0.28 }} />
        )}
        {boundary.map((point, index) => (
          <CircleMarker key={`${point[0]}-${point[1]}-${index}`} center={point} radius={5} pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#1e7a42", fillOpacity: 1 }} />
        ))}
      </MapContainer>
    </div>
  );
}
