"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
describe("Popup Directive", function () {
    var map;
    var popup;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement("div") }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        popup = new index_1.PopupDirective({ nativeElement: document.createElement("div") }, { ref: leaflet_1.marker([0, 0]) });
        popup._contentNode = document.createElement("div");
        popup._container = document.createElement("div");
        popup._wrapper = document.createElement("div");
    });
    describe("[(opened)]", function () {
        beforeEach(function () {
            popup._wrapper = document.createElement("div");
            popup.setLatLng(leaflet_1.latLng(0, 0));
            popup.openOn(map);
        });
        it("should remove DOM container when not opened", function () {
            popup.opened = false;
            /* istanbul ignore if */
            if (popup._container.parentNode) {
                throw new Error("Map is still parent element of the popup");
            }
        });
        it("should re-add DOM container when opened is true again", function () {
            popup.opened = true;
            /* istanbul ignore if */
            if (!popup._container.parentNode) {
                throw new Error("Map is still parent element of the popup");
            }
        });
    });
    describe("[(content)]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            popup.content = index_1.EXAMPLE_CONTENT;
            chai_1.expect(popup._content).to.equal(index_1.EXAMPLE_CONTENT);
        });
        it("should be changed in Angular when changing in Angular", function () {
            popup.content = index_1.EXAMPLE_CONTENT;
            chai_1.expect(popup.content).to.equal(index_1.EXAMPLE_CONTENT);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            popup.setContent(index_1.EXAMPLE_CONTENT);
            chai_1.expect(popup.content).to.equal(index_1.EXAMPLE_CONTENT);
        });
        it("should fire an event when changing in Angular", function (done) {
            popup.contentChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.EXAMPLE_CONTENT);
                done();
            });
            popup.content = index_1.EXAMPLE_CONTENT;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            popup.content = index_1.EXAMPLE_CONTENT;
            popup.contentChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.EXAMPLE_CONTENT + "?test");
                done();
            });
            popup.setContent(index_1.EXAMPLE_CONTENT + "?test");
        });
    });
    describe("[(lat)]", function () {
        beforeEach(function () {
            popup.setLatLng(leaflet_1.latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLat();
            popup.lat = val;
            chai_1.expect(popup.getLatLng().lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLat();
            popup.lat = val;
            chai_1.expect(popup.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLat();
            popup.setLatLng([val, 0]);
            chai_1.expect(popup.getLatLng().lat).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLat();
            popup.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            popup.lat = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLat();
            popup.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            popup.setLatLng([val, 0]);
        });
    });
    describe("[(lng)]", function () {
        beforeEach(function () {
            popup.setLatLng(leaflet_1.latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLng();
            popup.lng = val;
            chai_1.expect(popup.getLatLng().lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLng();
            popup.lng = val;
            chai_1.expect(popup.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLng();
            popup.setLatLng([0, val]);
            chai_1.expect(popup.lng).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLng();
            popup.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            popup.lng = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLng();
            popup.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            popup.setLatLng([0, val]);
        });
    });
    describe("[(position)]", function () {
        beforeEach(function () {
            popup.setLatLng(leaflet_1.latLng(0, 0));
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLatLng();
            popup.position = val;
            chai_1.expect(popup.getLatLng()).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLatLng();
            popup.position = val;
            chai_1.expect(popup.position).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLatLng();
            popup.setLatLng(val);
            chai_1.expect(popup.position).to.deep.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLatLng();
            popup.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(val);
                done();
            });
            popup.position = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLatLng();
            popup.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(val);
                done();
            });
            popup.setLatLng(val);
        });
    });
    // Events
    describe("(open)", function () {
        beforeEach(function () {
            popup.setLatLng(leaflet_1.latLng(0, 0));
        });
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            popup.openEvent.subscribe(function (event) {
                chai_1.expect(event.target).to.equal(popup);
                done();
            });
            popup.openOn(map);
        });
    });
    describe("(close)", function () {
        beforeEach(function () {
            popup.setLatLng(leaflet_1.latLng(0, 0));
            popup.openOn(map);
        });
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            popup.closeEvent.subscribe(function (event) {
                chai_1.expect(event.target).to.equal(popup);
                done();
            });
            popup._close();
        });
    });
    // Inputs
    describe("[maxWidth]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(1000, 0, 0);
            popup.maxWidth = val;
            chai_1.expect(popup.options.maxWidth).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(1000, 0, 0);
            popup.maxWidth = val;
            chai_1.expect(popup.maxWidth).to.equal(val);
        });
    });
    describe("[minWidth]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(1000, 0, 0);
            popup.minWidth = val;
            chai_1.expect(popup.options.minWidth).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(1000, 0, 0);
            popup.minWidth = val;
            chai_1.expect(popup.minWidth).to.equal(val);
        });
    });
    describe("[maxHeight]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber(1000, 0, 0);
            popup.maxHeight = val;
            chai_1.expect(popup.options.maxHeight).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber(1000, 0, 0);
            popup.maxHeight = val;
            chai_1.expect(popup.maxHeight).to.equal(val);
        });
    });
    describe("[autoPanPaddingTopLeft]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var num = spec_1.randomNumber(1000, 0, 0);
            var val = leaflet_1.point(num, num);
            popup.autoPanPaddingTopLeft = val;
            chai_1.expect(popup.options.autoPanPaddingTopLeft).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var num = spec_1.randomNumber(1000, 0, 0);
            var val = leaflet_1.point(num, num);
            popup.autoPanPaddingTopLeft = val;
            chai_1.expect(popup.autoPanPaddingTopLeft).to.equal(val);
        });
    });
    describe("[autoPanPaddingBottomRight]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var num = spec_1.randomNumber(1000, 0, 0);
            var val = leaflet_1.point(num, num);
            popup.autoPanPaddingBottomRight = val;
            chai_1.expect(popup.options.autoPanPaddingBottomRight).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var num = spec_1.randomNumber(1000, 0, 0);
            var val = leaflet_1.point(num, num);
            popup.autoPanPaddingBottomRight = val;
            chai_1.expect(popup.autoPanPaddingBottomRight).to.equal(val);
        });
    });
    describe("[autoPanPadding]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var num = spec_1.randomNumber(1000, 0, 0);
            var val = leaflet_1.point(num, num);
            popup.autoPanPadding = val;
            chai_1.expect(popup.options.autoPanPadding).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var num = spec_1.randomNumber(1000, 0, 0);
            var val = leaflet_1.point(num, num);
            popup.autoPanPadding = val;
            chai_1.expect(popup.autoPanPadding).to.equal(val);
        });
    });
    describe("[autoPan]", function () {
        it("should be changed to false in Leaflet when changing in Angular to false", function () {
            popup.autoPan = false;
            chai_1.expect(popup.options.autoPan).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", function () {
            popup.options.autoPan = false;
            popup.autoPan = true;
            chai_1.expect(popup.options.autoPan).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", function () {
            popup.autoPan = false;
            chai_1.expect(popup.autoPan).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", function () {
            popup.autoPan = true;
            chai_1.expect(popup.autoPan).to.equal(true);
        });
    });
    describe("[keepInView]", function () {
        it("should be changed to false in Leaflet when changing in Angular to false", function () {
            popup.keepInView = false;
            chai_1.expect(popup.options.keepInView).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", function () {
            popup.options.keepInView = false;
            popup.keepInView = true;
            chai_1.expect(popup.options.keepInView).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", function () {
            popup.keepInView = false;
            chai_1.expect(popup.keepInView).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", function () {
            popup.keepInView = true;
            chai_1.expect(popup.keepInView).to.equal(true);
        });
    });
    describe("[closeButton]", function () {
        it("should be changed to false in Leaflet when changing in Angular to false", function () {
            popup.closeButton = false;
            chai_1.expect(popup.options.closeButton).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", function () {
            popup.options.closeButton = false;
            popup.closeButton = true;
            chai_1.expect(popup.options.closeButton).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", function () {
            popup.closeButton = false;
            chai_1.expect(popup.closeButton).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", function () {
            popup.closeButton = true;
            chai_1.expect(popup.closeButton).to.equal(true);
        });
    });
    describe("[autoClose]", function () {
        it("should be changed to false in Leaflet when changing in Angular to false", function () {
            popup.autoClose = false;
            chai_1.expect(popup.options.autoClose).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", function () {
            popup.options.autoClose = false;
            popup.autoClose = true;
            chai_1.expect(popup.options.autoClose).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", function () {
            popup.autoClose = false;
            chai_1.expect(popup.autoClose).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", function () {
            popup.autoClose = true;
            chai_1.expect(popup.autoClose).to.equal(true);
        });
    });
    describe("[className]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = "test-class";
            popup.className = val;
            chai_1.expect(popup.options.className).to.equal(val);
        });
        it("should be changed in DOM when changing in Angular", function () {
            var val = "test-class";
            popup.className = val;
            chai_1.expect(popup._container.getAttribute("class").split(" ")).to.include(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = "test-class";
            popup.className = val;
            chai_1.expect(popup.className).to.equal(val);
        });
    });
    describe("[pane]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = "test-class";
            popup.pane = val;
            chai_1.expect(popup.options.pane).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = "test-class";
            popup.pane = val;
            chai_1.expect(popup.pane).to.equal(val);
        });
    });
    describe("Remove from source element on destroy", function () {
        it("should call unbindPopup on destroy", function (done) {
            popup.layerProvider.ref = {
                unbindPopup: done,
            };
            popup.ngOnDestroy();
        });
    });
});
//# sourceMappingURL=popup.directive.spec.js.map