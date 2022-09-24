import { circle, latLng } from 'leaflet';
import { TreeMapMarker } from './tree-map-marker.component';

export const createTreeMapMarker = (marker: TreeMapMarker) =>
  circle(latLng(marker.lat, marker.lng), {
    radius: 1,
    color: 'green',
  });
