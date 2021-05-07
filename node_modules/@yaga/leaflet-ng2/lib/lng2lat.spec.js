"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("./index");
var spec_1 = require("./spec");
describe("lng2lat helper", function () {
    it("should convert a Point", function () {
        var lat = spec_1.randomLat();
        var lng = spec_1.randomLng();
        var geom = [lat, lng];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([lng, lat]);
    });
    it("should convert a LineString or Multipoint", function () {
        var lat1 = spec_1.randomLat();
        var lng1 = spec_1.randomLng();
        var lat2 = spec_1.randomLat();
        var lng2 = spec_1.randomLng();
        var geom = [[lat1, lng1], [lat2, lng2]];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([[lng1, lat1], [lng2, lat2]]);
    });
    it("should convert a MultiLineString or Polygon", function () {
        var lat1 = spec_1.randomLat();
        var lng1 = spec_1.randomLng();
        var lat2 = spec_1.randomLat();
        var lng2 = spec_1.randomLng();
        var lat3 = spec_1.randomLat();
        var lng3 = spec_1.randomLng();
        var lat4 = spec_1.randomLat();
        var lng4 = spec_1.randomLng();
        var geom = [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]]);
    });
    it("should convert a MultiPolygon", function () {
        var lat1 = spec_1.randomLat();
        var lng1 = spec_1.randomLng();
        var lat2 = spec_1.randomLat();
        var lng2 = spec_1.randomLng();
        var lat3 = spec_1.randomLat();
        var lng3 = spec_1.randomLng();
        var lat4 = spec_1.randomLat();
        var lng4 = spec_1.randomLng();
        var lat5 = spec_1.randomLat();
        var lng5 = spec_1.randomLng();
        var lat6 = spec_1.randomLat();
        var lng6 = spec_1.randomLng();
        var lat7 = spec_1.randomLat();
        var lng7 = spec_1.randomLng();
        var lat8 = spec_1.randomLat();
        var lng8 = spec_1.randomLng();
        var geom = [
            [[[lat1, lng1], [lat2, lng2]], [[lat3, lng3], [lat4, lng4]]],
            [[[lat5, lng5], [lat6, lng6]], [[lat7, lng7], [lat8, lng8]]],
        ];
        geom = index_1.lng2lat(geom);
        chai_1.expect(geom).to.deep.equal([
            [[[lng1, lat1], [lng2, lat2]], [[lng3, lat3], [lng4, lat4]]],
            [[[lng5, lat5], [lng6, lat6]], [[lng7, lat7], [lng8, lat8]]],
        ]);
    });
});
//# sourceMappingURL=lng2lat.spec.js.map