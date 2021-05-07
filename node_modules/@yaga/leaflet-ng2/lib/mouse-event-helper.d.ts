import { LeafletMouseEvent, Map } from "leaflet";
/**
 * Helper function to enhance browser mouse events to Leaflet mouse events
 * @private
 */
export declare function enhanceMouseEvent(originalEvent: MouseEvent, map: Map): LeafletMouseEvent;
