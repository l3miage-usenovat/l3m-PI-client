import { ElementRef, EventEmitter } from "@angular/core";
import { DivIcon, LeafletEvent, Point } from "leaflet";
import { MarkerProvider } from "./marker.provider";
/**
 * Angular2 directive for Leaflet div-icons.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker>
 *         <yaga-div-icon
 *             [iconAnchor]="..."
 *             [iconSize]="..."
 *             [popupAnchor]="...">
 *             You can paste your HTML content for the icon here!
 *         </yaga-div-icon>
 *     </yaga-marker>
 * </yaga-map>
 * ```
 *
 * Notes:
 *
 * * All div-icon-directives have the css-class `yaga-div-icon`.
 * * The `contentHtml` property is not the child-node in the leaflet div-icon, it is the clone of it and gets cloned
 * again on every change.
 *
 * @link http://leafletjs.com/reference-1.2.0.html#divicon Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=DivIcon%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/div-icon.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/divicondirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/div-icon-directive/
 */
export declare class DivIconDirective extends DivIcon {
    markerProvider: MarkerProvider;
    /**
     * This is an EventEmitter used to notify on any change in this object. It is mainly created to provide reactions
     * of the marker directive on changes.
     */
    updateEvent: EventEmitter<LeafletEvent>;
    /**
     * The native element from angulars element-ref and blueprint for the icon content.
     */
    contentHtml: HTMLElement;
    constructor(elementRef: ElementRef, markerProvider: MarkerProvider);
    /**
     * Input for the iconSize.
     * Use it with `<yaga-div-icon [iconSize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#divicon-iconsize Original Leaflet documentation
     */
    iconSize: Point;
    /**
     * Input for the iconAnchor.
     * Use it with `<yaga-div-icon [iconAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#divicon-iconanchor Original Leaflet documentation
     */
    iconAnchor: Point;
    /**
     * Input for the popupAnchor.
     * Use it with `<yaga-div-icon [popupAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#divicon-popupanchor Original Leaflet documentation
     */
    popupAnchor: Point;
    /**
     * This inherited function enhances the directive with an own css-class and clones the its html content into the
     * leaflet div icon.
     */
    createIcon(oldDivIcon: HTMLElement): HTMLElement;
}
