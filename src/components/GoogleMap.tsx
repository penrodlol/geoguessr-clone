import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { QGame } from '@utils/trpc';
import { FC, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { GoogleMapMarker } from './GoogleMarker';

export interface GoogleMapProps extends google.maps.MapOptions {
  pano: NonNullable<QGame<'get'>>['pano'];
  marker?: LatLngLiteral;
  onGuess: (latLng: LatLngLiteral) => void;
}

export const GoogleMap: FC<GoogleMapProps> = ({ pano, marker, onGuess }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<google.maps.Map>();
  const [latLng, setLatLng] = useState<google.maps.LatLngLiteral>();

  useEffect(() => {
    if (!mapRef.current || !streetViewRef.current) return;

    const map = createMap(mapRef.current);
    const streetView = createStreetView(streetViewRef.current, pano);

    map.setStreetView(streetView);
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) setLatLng(e.latLng.toJSON());
    });

    setMap(map);
  }, [pano]);

  useEffect(() => {
    if (!map || !latLng || !marker) return;

    const line = createLine(map, [marker, latLng]);
    line.setMap(map);
  }, [map, latLng, marker]);

  return (
    <div className="flex-grow">
      <div
        className="absolute bottom-10 left-10 z-20 flex h-72 w-72 flex-col gap-3
                   hover:h-[25rem] hover:w-[30rem]"
      >
        <div
          ref={mapRef}
          className="h-full w-full rounded-lg border-2 border-brand-1 shadow-2xl"
        />
        {map &&
          latLng &&
          [marker, latLng]?.map((marker, i) => (
            <GoogleMapMarker key={i} map={map} position={marker} />
          ))}
        <Button
          disabled={(!map && !latLng) || !!marker}
          onClick={() => latLng && onGuess(latLng)}
        >
          Guess
        </Button>
      </div>
      <div
        ref={streetViewRef}
        className="h-full w-full rounded-md border-2 border-brand-1 shadow-xl"
      />
    </div>
  );
};

const createMap = (div: HTMLDivElement) =>
  new google.maps.Map(div, {
    center: { lat: 0, lng: 0 },
    disableDefaultUI: true,
    zoom: 1,
  });

const createStreetView = (div: HTMLDivElement, pano: GoogleMapProps['pano']) =>
  new google.maps.StreetViewPanorama(div, {
    pano,
    pov: { heading: 34, pitch: 0 },
    showRoadLabels: false,
    addressControl: false,
    fullscreenControl: false,
  });

const createLine = (map: google.maps.Map, path: google.maps.LatLngLiteral[]) =>
  new google.maps.Polyline({
    path,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map,
  });
