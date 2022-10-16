type Map = ReturnType<typeof createMap>;
type Path = Array<google.maps.LatLngLiteral>;

export const createMap = (div: HTMLDivElement) =>
  new google.maps.Map(div, {
    center: { lat: 0, lng: 0 },
    disableDefaultUI: true,
    zoom: 1,
  });

export const createStreetView = (div: HTMLDivElement, pano: string) =>
  new google.maps.StreetViewPanorama(div, {
    pano,
    pov: { heading: 34, pitch: 0 },
    showRoadLabels: false,
    addressControl: false,
    fullscreenControl: false,
  });

export const createPolyline = (map: Map, path: Path) =>
  new google.maps.Polyline({ path, map });

export const fitBounds = (map: Map, path: Path) => {
  const bounds = new google.maps.LatLngBounds();
  path.forEach((p) => bounds.extend(p));
  map.fitBounds(bounds);
};
