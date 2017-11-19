export const getUtmZoneFromPosition = (lon: number, lat: number): number =>
	(Math.floor((lon + 180) / 6) % 60) + 1;

export const FileXMLCheck = (files: FileList): boolean =>
	Array.from(files).every(item => item.type.includes('xml'));

