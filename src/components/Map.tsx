import env from '@env/client.mjs';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { QGame } from '@utils/trpc';
import { FC, useEffect, useRef } from 'react';

export interface MapProps {
  coordinate: NonNullable<QGame<'get'>>['rounds'][number]['coordinate'];
}

export const Map: FC<MapProps> = (props) => (
  <Wrapper
    apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    render={(s) => (s === Status.SUCCESS ? <GoogleMap {...props} /> : <></>)}
  />
);

const GoogleMap: FC<MapProps> = ({ coordinate }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !streetViewRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: coordinate.lat, lng: coordinate.lng },
      disableDefaultUI: true,
      zoom: 1,
    });
    const streetView = new google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        pano: coordinate.pano,
        pov: { heading: 34, pitch: 0 },
        showRoadLabels: false,
        addressControl: false,
        fullscreenControl: false,
      },
    );

    map.setStreetView(streetView);
  }, [coordinate]);

  return (
    <div className="flex-grow">
      <div
        className="absolute bottom-20 left-0 z-30 h-72 w-72 rounded-lg bg-1 shadow-2xl
                   hover:h-1/3 hover:w-1/3"
      >
        <div ref={mapRef} className="absolute inset-1 rounded-md" />
      </div>
      <div ref={streetViewRef} className="h-full w-full" />
    </div>
  );
};
