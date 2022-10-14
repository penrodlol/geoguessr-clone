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
      zoom: 2,
    });
    const streetView = new google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        pano: coordinate.pano,
        pov: { heading: 34, pitch: 10 },
        showRoadLabels: false,
        addressControl: false,
        fullscreenControl: false,
      },
    );

    map.setStreetView(streetView);
  }, [coordinate]);

  return (
    <div className="fixed inset-0 flex">
      <div className="h-full w-1/2" ref={mapRef} />
      <div className="h-full w-1/2" ref={streetViewRef} />
    </div>
  );
};
