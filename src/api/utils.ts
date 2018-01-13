export const getUtmZoneFromPosition = (lon: number, lat: number): number =>
  Math.floor((lon + 180) / 6) % 60 + 1;
