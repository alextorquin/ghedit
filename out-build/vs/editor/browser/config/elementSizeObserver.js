var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/common/lifecycle'], function (require, exports, lifecycle_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ElementSizeObserver = (function (_super) {
        __extends(ElementSizeObserver, _super);
        function ElementSizeObserver(referenceDomElement, changeCallback) {
            _super.call(this);
            this.referenceDomElement = referenceDomElement;
            this.changeCallback = changeCallback;
            this.measureReferenceDomElementToken = -1;
            this.width = -1;
            this.height = -1;
            this.measureReferenceDomElement(false);
        }
        ElementSizeObserver.prototype.dispose = function () {
            this.stopObserving();
            _super.prototype.dispose.call(this);
        };
        ElementSizeObserver.prototype.getWidth = function () {
            return this.width;
        };
        ElementSizeObserver.prototype.getHeight = function () {
            return this.height;
        };
        ElementSizeObserver.prototype.startObserving = function () {
            var _this = this;
            if (this.measureReferenceDomElementToken === -1) {
                this.measureReferenceDomElementToken = setInterval(function () { return _this.measureReferenceDomElement(true); }, 100);
            }
        };
        ElementSizeObserver.prototype.stopObserving = function () {
            if (this.measureReferenceDomElementToken !== -1) {
                clearInterval(this.measureReferenceDomElementToken);
                this.measureReferenceDomElementToken = -1;
            }
        };
        ElementSizeObserver.prototype.observe = function (dimension) {
            this.measureReferenceDomElement(true, dimension);
        };
        ElementSizeObserver.prototype.measureReferenceDomElement = function (callChangeCallback, dimension) {
            var observedWidth = 0;
            var observedHeight = 0;
            if (dimension) {
                observedWidth = dimension.width;
                observedHeight = dimension.height;
            }
            else if (this.referenceDomElement) {
                observedWidth = this.referenceDomElement.clientWidth;
                observedHeight = this.referenceDomElement.clientHeight;
            }
            observedWidth = Math.max(5, observedWidth);
            observedHeight = Math.max(5, observedHeight);
            if (this.width !== observedWidth || this.height !== observedHeight) {
                this.width = observedWidth;
                this.height = observedHeight;
                if (callChangeCallback) {
                    this.changeCallback();
                }
            }
        };
        return ElementSizeObserver;
    }(lifecycle_1.Disposable));
    exports.ElementSizeObserver = ElementSizeObserver;
});