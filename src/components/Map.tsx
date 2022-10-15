import env from '@env/client.mjs';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { QGame } from '@utils/trpc';
import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface MapProps extends google.maps.MapOptions, PropsWithChildren {
  coordinate: NonNullable<QGame<'get'>>['rounds'][number]['coordinate'];
  onMarker: (e: google.maps.MapMouseEvent) => void;
}

export const Map: FC<MapProps> = (props) => (
  <Wrapper
    apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    render={(s) =>
      s === Status.SUCCESS ? (
        <GoogleMap {...props}>
          {/* <GoogleMapMarker
            position={{
              lat: props.coordinate.lat,
              lng: props.coordinate.lng,
            }}
          /> */}
        </GoogleMap>
      ) : (
        <></>
      )
    }
  />
);

const GoogleMap: FC<MapProps> = ({ children, coordinate, onMarker }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>();

  useEffect(() => {
    if (!mapRef.current || !streetViewRef.current || !onMarker) return;

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
    map.addListener('click', onMarker);

    setMap(map);
  }, [coordinate, onMarker]);

  return (
    <div className="flex-grow">
      <div
        className="absolute bottom-20 left-0 z-30 h-72 w-72 rounded-lg bg-1 shadow-2xl
                   hover:h-1/3 hover:w-1/3"
      >
        <div ref={mapRef} className="absolute inset-1 rounded-md" />
        {map &&
          Children.toArray(children)
            .filter(isValidElement)
            .map((child) => cloneElement(child, { map }))}
      </div>
      <div ref={streetViewRef} className="h-full w-full" />
    </div>
  );
};

const GoogleMapMarker: FC<google.maps.MarkerOptions> = (props) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) setMarker(new google.maps.Marker());
    return () => marker && marker.setMap(null);
  }, [marker]);

  useEffect(() => {
    marker && marker.setOptions(props);
  }, [marker, props]);

  return null;
};
