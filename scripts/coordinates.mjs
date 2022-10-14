// @ts-check
import { Client } from '@googlemaps/google-maps-services-js';
import { PrismaClient } from '@prisma/client';
import { unique } from 'radash';

const KEY = 'XXX';

(async () => {
  const maps = new Client({});
  const prisma = new PrismaClient();

  const nearedRoads = await maps
    .nearestRoads({
      params: {
        key: KEY,
        points: [{ latitude: 0, longitude: 0 }].map((r) => ({
          latitude: Number(r.latitude.toFixed(6)),
          longitude: Number(r.longitude.toFixed(6)),
        })),
      },
    })
    .then((r) => r.data.snappedPoints)
    .then((points) => unique(points, (p) => p.originalIndex));

  const payload = await Promise.all(
    nearedRoads.map(async (road) => {
      const { latitude, longitude } = road.location;
      const url = 'https://maps.googleapis.com/maps/api/streetview/metadata';
      const location = `location=${latitude},${longitude}`;

      return fetch(`${url}?${location}&key=${KEY}`).then((r) => r.json());
    }),
  );

  await prisma.coordinate.createMany({
    data: unique(payload, (c) => c.pano_id)
      .filter((c) => c.pano_id && c.location)
      .map((c) => ({
        panoid: c.pano_id,
        lat: c.location.lat,
        lng: c.location.lng,
      })),
  });
})();
