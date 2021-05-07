"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var path_directives_spec_1 = require("./path-directives.spec");
var spec_1 = require("./spec");
describe("Rectangle Directive", function () {
    path_directives_spec_1.createPathTests(index_1.RectangleDirective);
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement("div") }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.RectangleDirective({ ref: map }, {});
    });
    describe("[(display)]", function () {
        it("should set DOM container style to display:none when not displaying", function () {
            layer.display = false;
            chai_1.expect(layer.getElement().style.display).to.equal("none");
        });
        it("should reset DOM container style when display is true again", function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(layer.getElement().style.display).to.not.equal("none");
        });
        it("should set to false by removing from map", function (done) {
            layer.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(false);
                chai_1.expect(layer.display).to.equal(false);
                done();
            });
            map.removeLayer(layer);
        });
        it("should set to true when adding to map again", function (done) {
            map.removeLayer(layer);
            layer.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(true);
                chai_1.expect(layer.display).to.equal(true);
                done();
            });
            map.addLayer(layer);
        });
    });
    describe("[(latlngs)]", function () {
        describe("for Polygons", function () {
            var TEST_VALUE = [[spec_1.randomLatLng(), spec_1.randomLatLng(), spec_1.randomLatLng()]];
            it("should be changed in Leaflet when changing in Angular", function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer._latlngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", function () {
                layer.setLatLngs(TEST_VALUE);
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when adding in Leaflet", function () {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.latLngs[0][3].lat !== 3 ||
                    layer.latLngs[0][3].lng !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.latLngs);
                }
            });
            it("should fire an event when changing in Angular", function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire geoJSON-change event when changing in Angular", function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire geoJSON-change event when changing in Leaflet", function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire an change event when adding in Leaflet", function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe("for MultiPolygons", function () {
            var TEST_VALUE = [
                [[leaflet_1.latLng(1, 0), leaflet_1.latLng(1, 1), leaflet_1.latLng(0, 1)]],
                [[leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)]],
            ];
            it("should be changed in Leaflet when changing in Angular", function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer._latlngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Angular", function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when changing in Leaflet", function () {
                layer.setLatLngs(TEST_VALUE);
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it("should be changed in Angular when adding in Leaflet", function () {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.latLngs[0][0][3].lat !== 3 ||
                    layer.latLngs[0][0][3].lng !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.latLngs[0][0]);
                }
            });
            it("should fire an event when changing in Angular", function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire geoJSON-change event when changing in Angular", function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it("should fire geoJSON-change event when changing in Leaflet", function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it("should fire an change event when adding in Leaflet", function (done) {
                layer.geoJSONChange.subscribe(function () {
                    // todo: test for correct data
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });
    describe("[(geoJSON)]", function () {
        describe("for Polygon", function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    type: "Polygon",
                },
                properties: {},
                type: "Feature",
            };
            var TEST_POLYGON = [[[0, 0], [1, 0], [1, 1], [0, 0]]];
            it("should be changed in Leaflet when changing in Angular", function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    layer.latLngs[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    layer.latLngs[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    layer.latLngs[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    layer.latLngs[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    layer.latLngs[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    /* tslint:disable:max-line-length */
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                    /* tslint:enable */
                }
            });
            it("should be changed in Angular when changing in Angular", function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it("should be changed geoJSON in Angular when changing in latlngs Leaflet", function () {
                layer.setLatLngs(TEST_POLYGON);
                chai_1.expect(index_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
            });
            it("should be changed geoJSON in Angular when adding in latlngs Leaflet", function () {
                layer.setLatLngs(TEST_POLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.geoJSON.geometry.coordinates);
                }
            });
            it("should fire an event when changing in Angular", function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.geoJSON = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(index_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
                    return done();
                });
                layer.setLatLngs(TEST_POLYGON);
            });
            it("should fire an event when adding in Leaflet", function (done) {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[0][3][0] !== 3 ||
                        values[0][3][1] !== 3) {
                        return done(new Error("Received wrong value"));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe("for MultiPolygon", function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [
                        [[[1, 0], [1, 1], [0, 1], [1, 0]]],
                        [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    ],
                    type: "MultiPolygon",
                },
                properties: {},
                type: "Feature",
            };
            var TEST_MULTIPOLYGON = [
                [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                [[[0, 0], [0, 1], [1, 1], [0, 0]]],
            ];
            it("should be changed in Leaflet when changing in Angular", function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    layer.latLngs[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    layer.latLngs[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    layer.latLngs[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    layer.latLngs[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    layer.latLngs[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||
                    layer.latLngs[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    layer.latLngs[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    layer.latLngs[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    layer.latLngs[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    layer.latLngs[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    layer.latLngs[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1]) {
                    /* tslint:disable:max-line-length */
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                    /* tslint:enable */
                }
            });
            it("should be changed in Angular when changing in Angular", function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it("should be changed geoJSON in Angular when changing in latlngs Leaflet", function () {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== "MultiPolygon") {
                    throw new Error("Received wrong geometry type: " + layer.geoJSON.geometry.type);
                }
                chai_1.expect(index_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
            });
            it("should be changed geoJSON in Angular when adding in latlngs Leaflet", function () {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== "MultiPolygon") {
                    throw new Error("Received wrong geometry type: " + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][0][3][1] !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.geoJSON.geometry.coordinates);
                }
            });
            it("should fire an event when changing in Angular", function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.geoJSON = TEST_VALUE;
            });
            it("should fire an event when changing in Leaflet", function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(index_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
                    return done();
                });
                layer.setLatLngs(TEST_MULTIPOLYGON);
            });
            it("should fire an event when adding in Leaflet", function (done) {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[0][0][3][0] !== 3 ||
                        values[0][0][3][1] !== 3) {
                        return done(new Error("Received wrong value"));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });
    describe("[(bounds)]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLatLngBounds();
            layer.bounds = val;
            chai_1.expect(layer.getBounds().equals(val)).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLatLngBounds();
            layer.bounds = val;
            chai_1.expect(layer.bounds.equals(val)).to.equal(true);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLatLngBounds();
            layer.setBounds(val);
            chai_1.expect(layer.bounds.equals(val)).to.equal(true);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLatLngBounds();
            layer.boundsChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.equals(val)).to.equal(true);
                done();
            });
            layer.ngAfterContentInit();
            layer.bounds = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLatLngBounds();
            layer.boundsChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.equals(val)).to.equal(true);
                done();
            });
            layer.ngAfterContentInit();
            layer.setBounds(val);
        });
    });
    describe("[(north)]", function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(90);
            layer.north = val;
            chai_1.expect(layer.getBounds().getNorth()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(90);
            layer.north = val;
            chai_1.expect(layer.north).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomNumber(90);
            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
            chai_1.expect(layer.north).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomNumber(90);
            layer.northChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.north = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomNumber(90);
            layer.northChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
        });
    });
    describe("[(east)]", function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(180);
            layer.east = val;
            chai_1.expect(layer.getBounds().getEast()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(180);
            layer.east = val;
            chai_1.expect(layer.east).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomNumber(180);
            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
            chai_1.expect(layer.east).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomNumber(180);
            layer.eastChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.east = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomNumber(180);
            layer.eastChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
        });
    });
    describe("[(south)]", function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(0, -90);
            layer.south = val;
            chai_1.expect(layer.getBounds().getSouth()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(0, -90);
            layer.south = val;
            chai_1.expect(layer.south).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomNumber(0, -90);
            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
            chai_1.expect(layer.south).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomNumber(0, -90);
            layer.southChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.south = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomNumber(0, -90);
            layer.southChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
        });
    });
    describe("[(west)]", function () {
        beforeEach(function () {
            layer.setBounds([[0, 0], [1, 1]]);
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(0, -180);
            layer.west = val;
            chai_1.expect(layer.getBounds().getWest()).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(0, -180);
            layer.west = val;
            chai_1.expect(layer.west).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomNumber(0, -180);
            layer.setBounds(leaflet_1.latLngBounds([
                [0, val],
                [1, 1],
            ]));
            chai_1.expect(layer.west).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomNumber(0, -180);
            layer.westChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.west = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomNumber(0, -180);
            layer.westChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.ngAfterContentInit();
            layer.setBounds([
                [0, val],
                [1, 1],
            ]);
        });
    });
    describe("[smoothFactor]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(10, 1, 0);
            layer.smoothFactor = val;
            chai_1.expect(layer.options.smoothFactor).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(10, 1, 0);
            layer.smoothFactor = val;
            chai_1.expect(layer.smoothFactor).to.equal(val);
        });
    });
    describe("[properties]", function () {
        var layerWithProperties;
        var TEST_OBJECT = {
            test: "OK",
        };
        beforeEach(function () {
            layerWithProperties = new index_1.RectangleDirective({ ref: map }, {});
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            layerWithProperties.properties = TEST_OBJECT;
            chai_1.expect(layerWithProperties.feature.properties).to.deep.equal(TEST_OBJECT);
        });
        it("should be changed in Angular when changing in Angular", function () {
            layerWithProperties.properties = TEST_OBJECT;
            chai_1.expect(layerWithProperties.properties).to.deep.equal(TEST_OBJECT);
        });
        it("should emit an event for GeoJSONChange when changing in Angular", function (done) {
            layerWithProperties.geoJSONChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.properties).to.deep.equal(TEST_OBJECT);
                done();
            });
            layerWithProperties.properties = TEST_OBJECT;
        });
    });
    describe("[noClip]", function () {
        it("should be changed to false in Leaflet when changing in Angular to false", function () {
            layer.noClip = false;
            chai_1.expect(layer.options.noClip).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", function () {
            layer.options.noClip = false;
            layer.noClip = true;
            chai_1.expect(layer.options.noClip).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", function () {
            layer.noClip = false;
            chai_1.expect(layer.noClip).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", function () {
            layer.noClip = true;
            chai_1.expect(layer.noClip).to.equal(true);
        });
    });
    describe("Popup in Rectangle Directive", function () {
        var layerWithPopup;
        var popup;
        var testDiv;
        before(function () {
            testDiv = document.createElement("div");
            layerWithPopup = new index_1.RectangleDirective({ ref: map }, {});
            popup = new index_1.PopupDirective({ nativeElement: testDiv }, { ref: layerWithPopup });
            layerWithPopup.ngAfterContentInit();
        });
        it("should bind popup", function () {
            chai_1.expect(layerWithPopup._popup).to.equal(popup);
        });
    });
    describe("Tooltip in Rectangle Directive", function () {
        var layerWithTooltip;
        var tooltip;
        var testDiv;
        before(function () {
            testDiv = document.createElement("div");
            layerWithTooltip = new index_1.RectangleDirective({ ref: map }, {});
            tooltip = new index_1.TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it("should bind tooltip", function () {
            chai_1.expect(layerWithTooltip._tooltip).to.equal(tooltip);
        });
    });
    describe("Destroying a Rectangle Directive", function () {
        it("should remove Rectangle Directive from map on destroy", function () {
            /* istanbul ignore if */
            if (!map.hasLayer(layer)) {
                throw new Error("The layer is not part of the map before destroying");
            }
            layer.ngOnDestroy();
            /* istanbul ignore if */
            if (map.hasLayer(layer)) {
                throw new Error("The layer is still part of the map after destroying");
            }
        });
    });
});
//# sourceMappingURL=rectangle.directive.spec.js.map