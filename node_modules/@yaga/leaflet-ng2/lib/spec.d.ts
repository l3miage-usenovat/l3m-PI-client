import { LatLng, LatLngBounds } from "leaflet";
/**
 * Helper function to create random numbers within a range
 * @private
 */
export declare function randomNumber(max?: number, min?: number, after?: number): number;
/**
 * Helper function to create random latitude values
 * @private
 */
export declare function randomLat(): number;
/**
 * Helper function to create random longitude values
 * @private
 */
export declare function randomLng(): number;
/**
 * Helper function to create random latitude-longitude values pairs
 * @private
 */
export declare function randomLatLng(): LatLng;
/**
 * Helper function to create random spatial bounds
 * @private
 */
export declare function randomLatLngBounds(): LatLngBounds;
/**
 * Helper function to detect if an element is a child of another
 * @private
 */
export declare function hasAsChild(root: HTMLElement, child: HTMLElement): boolean;
