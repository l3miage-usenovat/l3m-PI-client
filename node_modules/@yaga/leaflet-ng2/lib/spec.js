"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var leaflet_1 = require("leaflet");
/**
 * Helper function to create random numbers within a range
 * @private
 */
function randomNumber(max, min, after) {
    if (max === void 0) { max = 1; }
    if (min === void 0) { min = 0; }
    if (after === void 0) { after = 3; }
    return (Math.floor(Math.random() * (Math.abs(max) + Math.abs(min)) * Math.pow(10, after)) / Math.pow(10, after)) + min;
}
exports.randomNumber = randomNumber;
/**
 * Helper function to create random latitude values
 * @private
 */
function randomLat() {
    return randomNumber(90, -90);
}
exports.randomLat = randomLat;
/**
 * Helper function to create random longitude values
 * @private
 */
function randomLng() {
    return randomNumber(180, -180);
}
exports.randomLng = randomLng;
/**
 * Helper function to create random latitude-longitude values pairs
 * @private
 */
function randomLatLng() {
    return new leaflet_1.LatLng(randomLat(), randomLng());
}
exports.randomLatLng = randomLatLng;
/**
 * Helper function to create random spatial bounds
 * @private
 */
function randomLatLngBounds() {
    var lat1 = randomLat();
    var lat2 = randomLat();
    var lng1 = randomLng();
    var lng2 = randomLng();
    return new leaflet_1.LatLngBounds(new leaflet_1.LatLng(lat1 < lat2 ? lat1 : lat2, lng1 < lng2 ? lng1 : lng2), new leaflet_1.LatLng(lat1 < lat2 ? lat2 : lat1, lng1 < lng2 ? lng2 : lng1));
}
exports.randomLatLngBounds = randomLatLngBounds;
/**
 * Helper function to detect if an element is a child of another
 * @private
 */
function hasAsChild(root, child) {
    var length = root.children.length;
    for (var i = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}
exports.hasAsChild = hasAsChild;
//# sourceMappingURL=spec.js.map