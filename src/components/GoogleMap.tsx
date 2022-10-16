import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import {
  createMap,
  createPolyline,
  createStreetView,
  fitBounds,
} from '@utils/map';
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
    if (!mapRef.current || !streetViewRef.current || !pano) return;

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

    createPolyline(map, [marker, latLng]).setMap(map);
    fitBounds(map, [marker, latLng]);
  }, [map, latLng, marker]);

  return (
    <div className="flex-grow">
      <div
        className="absolute bottom-10 left-10 z-20 flex h-64 w-64
                   flex-col gap-3 hover:h-[25rem] hover:w-[30rem]"
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
          disabled={!map && !latLng}
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
