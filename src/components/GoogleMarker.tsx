import { FC, useEffect, useState } from 'react';

export const GoogleMapMarker: FC<google.maps.MarkerOptions> = (props) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) setMarker(new google.maps.Marker());
    return () => marker && marker.setMap(null);
  }, [marker]);

  useEffect(() => marker && marker.setOptions(props), [marker, props]);

  return null;
};
