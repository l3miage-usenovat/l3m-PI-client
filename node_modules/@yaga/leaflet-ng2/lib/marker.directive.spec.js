"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
function hasAsChild(root, child) {
    "use strict";
    var length = root.children.length;
    for (var i = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}
describe("Marker Directive", function () {
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement("div") }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        layer = new index_1.MarkerDirective({ ref: map }, {}, {});
    });
    describe("[(display)]", function () {
        it("should remove DOM container when not displaying", function () {
            layer.display = false;
            chai_1.expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(false);
        });
        it("should re-add DOM container when display is true again", function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(true);
        });
        it("should remove EventListeners when not displaying", function (done) {
            var zoomEvents = map._events.zoom;
            var length = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            var originalEventListener = layer.getEvents()["zoom"];
            /* tslint:enable */
            layer.display = false;
            for (var i = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error("There is still an event on listener"));
                }
            }
            done();
        });
        it("should re-add EventListeners when display is true again", function (done) {
            var zoomEvents = map._events.zoom;
            var length = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            var originalEventListener = layer.getEvents()["zoom"];
            /* tslint:enable */
            layer.display = false;
            layer.display = true;
            for (var i = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
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
    describe("[(popupOpened)]", function () {
        beforeEach(function () {
            layer.bindPopup("test-popup");
        });
        it("should be opened in Leaflet when changing in Angular", function () {
            layer.popupOpened = true;
            chai_1.expect(layer.isPopupOpen()).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", function () {
            layer.popupOpened = true;
            chai_1.expect(layer.popupOpened).to.equal(true);
        });
        it("should be changed in Angular when opened in Leaflet", function () {
            layer.openPopup();
            chai_1.expect(layer.popupOpened).to.equal(true);
        });
        it("should fire an event when opening in Angular", function (done) {
            layer.popupOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                return done();
            });
            layer.popupOpened = true;
        });
        it("should fire an event when opening in Leaflet", function (done) {
            layer.popupOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                return done();
            });
            layer.openPopup();
        });
        // closing after opening
        it("should be closed in Leaflet when changing in Angular", function () {
            layer.popupOpened = true;
            layer.popupOpened = false;
            chai_1.expect(layer.isPopupOpen()).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", function () {
            layer.popupOpened = true;
            layer.popupOpened = false;
            chai_1.expect(layer.popupOpened).to.equal(false);
        });
        it("should be changed in Angular when closing in Leaflet", function () {
            layer.openPopup();
            layer.closePopup();
            chai_1.expect(layer.popupOpened).to.equal(false);
        });
        it("should fire an event when opening in Angular", function (done) {
            layer.popupOpened = true;
            layer.popupOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(false);
                return done();
            });
            layer.popupOpened = false;
        });
        it("should fire an event when closing in Leaflet", function (done) {
            layer.openPopup();
            layer.popupOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(false);
                return done();
            });
            layer.closePopup();
        });
    });
    describe("[(tooltipOpened)]", function () {
        beforeEach(function () {
            layer.bindTooltip("test-tooltip");
        });
        it("should be opened in Leaflet when changing in Angular", function () {
            layer.tooltipOpened = true;
            chai_1.expect(layer.isTooltipOpen()).to.equal(true);
        });
        it("should be changed in Angular when changing in Angular", function () {
            layer.tooltipOpened = true;
            chai_1.expect(layer.tooltipOpened).to.equal(true);
        });
        it("should be changed in Angular when opened in Leaflet", function () {
            layer.openTooltip();
            chai_1.expect(layer.tooltipOpened).to.equal(true);
        });
        it("should fire an event when opening in Angular", function (done) {
            layer.tooltipOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                return done();
            });
            layer.tooltipOpened = true;
        });
        it("should fire an event when opening in Leaflet", function (done) {
            layer.tooltipOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(true);
                return done();
            });
            layer.openTooltip();
        });
        // closing after opening
        it("should be closed in Leaflet when changing in Angular", function () {
            layer.tooltipOpened = true;
            layer.tooltipOpened = false;
            chai_1.expect(layer.isTooltipOpen()).to.equal(false);
        });
        it("should be changed in Angular when changing in Angular", function () {
            layer.tooltipOpened = true;
            layer.tooltipOpened = false;
            chai_1.expect(layer.tooltipOpened).to.equal(false);
        });
        it("should be changed in Angular when closing in Leaflet", function () {
            layer.openTooltip();
            layer.closeTooltip();
            chai_1.expect(layer.tooltipOpened).to.equal(false);
        });
        it("should fire an event when opening in Angular", function (done) {
            layer.tooltipOpened = true;
            layer.tooltipOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(false);
                return done();
            });
            layer.tooltipOpened = false;
        });
        it("should fire an event when closing in Leaflet", function (done) {
            layer.openTooltip();
            layer.tooltipOpenedChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(false);
                return done();
            });
            layer.closeTooltip();
        });
    });
    describe("[(opacity)]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber();
            layer.opacity = val;
            chai_1.expect(layer.options.opacity).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber();
            layer.opacity = val;
            chai_1.expect(layer.opacity).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomNumber();
            layer.setOpacity(val);
            chai_1.expect(layer.opacity).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomNumber();
            layer.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.opacity = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomNumber();
            layer.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setOpacity(val);
        });
    });
    describe("[(zIndexOffset)]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomNumber();
            layer.zIndexOffset = val;
            chai_1.expect(layer.options.zIndexOffset).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomNumber();
            layer.zIndexOffset = val;
            chai_1.expect(layer.zIndexOffset).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomNumber();
            layer.setZIndexOffset(val);
            chai_1.expect(layer.zIndexOffset).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomNumber();
            layer.zIndexOffsetChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.zIndexOffset = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomNumber();
            layer.zIndexOffsetChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setZIndexOffset(val);
        });
    });
    describe("[(lat)]", function () {
        beforeEach(function () {
            layer.ngAfterContentInit();
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLat();
            layer.lat = val;
            chai_1.expect(layer.getLatLng().lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLat();
            layer.lat = val;
            chai_1.expect(layer.lat).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLat();
            layer.setLatLng([val, 0]);
            chai_1.expect(layer.lat).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLat();
            layer.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.lat = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLat();
            layer.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setLatLng([val, 0]);
        });
    });
    describe("[(lng)]", function () {
        beforeEach(function () {
            layer.ngAfterContentInit();
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLng();
            layer.lng = val;
            chai_1.expect(layer.getLatLng().lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLng();
            layer.lng = val;
            chai_1.expect(layer.lng).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLng();
            layer.setLatLng([0, val]);
            chai_1.expect(layer.lng).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLng();
            layer.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.lng = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLng();
            layer.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setLatLng([0, val]);
        });
    });
    describe("[(position)]", function () {
        beforeEach(function () {
            layer.ngAfterContentInit();
        });
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = spec_1.randomLatLng();
            layer.position = val;
            chai_1.expect(layer.getLatLng()).to.deep.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = spec_1.randomLatLng();
            layer.position = val;
            chai_1.expect(layer.position).to.equal(val);
        });
        it("should be changed in Angular when changing in Leaflet", function () {
            var val = spec_1.randomLatLng();
            layer.setLatLng(val);
            chai_1.expect(layer.position).to.equal(val);
        });
        it("should fire an event when changing in Angular", function (done) {
            var val = spec_1.randomLatLng();
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(val);
                return done();
            });
            layer.position = val;
        });
        it("should fire an event when changing in Leaflet", function (done) {
            var val = spec_1.randomLatLng();
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(val);
                return done();
            });
            layer.setLatLng(val);
        });
    });
    // TODO: icon
    describe("[title]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = "http://test";
            layer.title = val;
            chai_1.expect(layer.options.title).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = "http://test";
            layer.title = val;
            chai_1.expect(layer.title).to.equal(val);
        });
    });
    describe("[alt]", function () {
        it("should be changed in Leaflet when changing in Angular", function () {
            var val = "http://test";
            layer.alt = val;
            chai_1.expect(layer.options.alt).to.equal(val);
        });
        it("should be changed in Angular when changing in Angular", function () {
            var val = "http://test";
            layer.alt = val;
            chai_1.expect(layer.alt).to.equal(val);
        });
    });
    describe("[draggable]", function () {
        it("should be changed to false in Leaflet when changing in Angular to false", function () {
            layer.draggable = false;
            chai_1.expect(layer.dragging.enabled()).to.equal(false);
        });
        it("should be changed to true in Leaflet when changing in Angular to true", function () {
            layer.dragging.disable();
            layer.draggable = true;
            chai_1.expect(layer.dragging.enabled()).to.equal(true);
        });
        it("should be changed in Angular to false when changing in Angular to false", function () {
            layer.draggable = false;
            chai_1.expect(layer.draggable).to.equal(false);
        });
        it("should be changed in Angular to true when changing in Angular to true", function () {
            layer.draggable = true;
            chai_1.expect(layer.draggable).to.equal(true);
        });
    });
    // Events
    describe("(dragend)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.dragendEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dragend", testEvent);
        });
    });
    describe("(dragstart)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.dragstartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dragstart", testEvent);
        });
    });
    describe("(movestart)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.movestartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("movestart", testEvent);
        });
    });
    describe("(drag)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.dragEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("drag", testEvent);
        });
    });
    describe("(moveend)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.moveendEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("moveend", testEvent);
        });
    });
    describe("(add)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("add", testEvent);
        });
    });
    describe("(remove)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.removeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("remove", testEvent);
        });
    });
    describe("(popupopen)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.popupopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("popupopen", testEvent);
        });
    });
    describe("(popupclose)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.popupcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("popupclose", testEvent);
        });
    });
    describe("(tooltipopen)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tooltipopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("tooltipopen", testEvent);
        });
    });
    describe("(tooltipclose)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tooltipcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("tooltipclose", testEvent);
        });
    });
    describe("(click)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("click", testEvent);
        });
    });
    describe("(dblclick)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.dblclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("dblclick", testEvent);
        });
    });
    describe("(mousedown)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.mousedownEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mousedown", testEvent);
        });
    });
    describe("(mouseover)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.mouseoverEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mouseover", testEvent);
        });
    });
    describe("(mouseout)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.mouseoutEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("mouseout", testEvent);
        });
    });
    describe("(contextmenu)", function () {
        it("should fire event in Angular when firing event in Leaflet", function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.contextmenuEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire("contextmenu", testEvent);
        });
    });
    describe("Popup in Marker Directive", function () {
        var layerWithPopup;
        var popup;
        before(function () {
            layerWithPopup = new index_1.MarkerDirective({ ref: map }, {}, {});
            popup = new index_1.PopupDirective({ nativeElement: document.createElement("div") }, { ref: layerWithPopup });
            layerWithPopup.ngAfterContentInit();
        });
        it("should bind popup", function () {
            chai_1.expect(layerWithPopup._popup).to.equal(popup);
        });
    });
    describe("Tooltip in Marker Directive", function () {
        var layerWithTooltip;
        var tooltip;
        var testDiv;
        before(function () {
            testDiv = document.createElement("div");
            layerWithTooltip = new index_1.MarkerDirective({ ref: map }, {}, {});
            tooltip = new index_1.TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it("should bind tooltip", function () {
            chai_1.expect(layerWithTooltip._tooltip).to.equal(tooltip);
        });
    });
    describe("Icon in Marker Directive", function () {
        var layerWithIcon;
        var icon;
        before(function () {
            layerWithIcon = new index_1.MarkerDirective({ ref: map }, {}, {});
            icon = new index_1.IconDirective({ ref: layerWithIcon });
            icon.iconUrl = index_1.TRANSPARENT_PIXEL;
            layerWithIcon.ngAfterContentInit();
        });
        it("should bind icon", function () {
            chai_1.expect(layerWithIcon._icon.getAttribute("src")).to.equal(index_1.TRANSPARENT_PIXEL);
        });
        it("should bind icon again on changes in icon directive", function () {
            var TEST_VALUE = "path/to/icon.png";
            icon.iconUrl = TEST_VALUE;
            chai_1.expect(layerWithIcon._icon.getAttribute("src")).to.equal(TEST_VALUE);
        });
    });
    describe("Destroying a Marker Directive", function () {
        it("should remove Marker Directive from map on destroy", function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            chai_1.expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
//# sourceMappingURL=marker.directive.spec.js.map