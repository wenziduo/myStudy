"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ActionType;
(function (ActionType) {
    ActionType[ActionType["zoomIn"] = 1] = "zoomIn";
    ActionType[ActionType["zoomOut"] = 2] = "zoomOut";
    ActionType[ActionType["prev"] = 3] = "prev";
    ActionType[ActionType["next"] = 4] = "next";
    ActionType[ActionType["rotateLeft"] = 5] = "rotateLeft";
    ActionType[ActionType["rotateRight"] = 6] = "rotateRight";
    ActionType[ActionType["reset"] = 7] = "reset";
    ActionType[ActionType["close"] = 8] = "close";
    ActionType[ActionType["scaleX"] = 9] = "scaleX";
    ActionType[ActionType["scaleY"] = 10] = "scaleY";
    ActionType[ActionType["download"] = 11] = "download";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        var prefixCls = 'react-viewer-icon';
        return (<i className={prefixCls + " " + prefixCls + "-" + ActionType[this.props.type]}></i>);
    };
    return Icon;
}(React.Component));
exports.default = Icon;
