import { QGame } from '@utils/trpc';
import { FC, useEffect, useRef, useState } from 'react';
import { GoogleMapMarker } from './GoogleMarker';

export interface GoogleMapProps extends google.maps.MapOptions {
  pano: NonNullable<QGame<'get'>>['pano'];
}

export const GoogleMap: FC<GoogleMapProps> = ({ pano }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<google.maps.Map | null>();

  useEffect(() => {
    if (!mapRef.current || !streetViewRef.current) return;

    const map = createMap(mapRef.current);
    const streetView = createStreetView(streetViewRef.current, pano);

    map.setStreetView(streetView);
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      console.log(e.latLng?.toJSON());
    });

    setMap(map);
  }, [pano]);

  return (
    <div className="flex-grow">
      <div
        className="absolute bottom-20 left-0 z-30 h-72 w-72 rounded-lg bg-1 shadow-2xl
                   hover:h-1/3 hover:w-1/3"
      >
        <div ref={mapRef} className="absolute inset-1 rounded-md" />
        {map && <GoogleMapMarker map={map} />}
      </div>
      <div ref={streetViewRef} className="h-full w-full" />
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
