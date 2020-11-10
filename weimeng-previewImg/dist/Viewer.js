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
var ReactDOM = require("react-dom");
var ViewerCore_1 = require("./ViewerCore");
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    function Viewer(props) {
        var _this = _super.call(this, props) || this;
        _this.container = null;
        _this.defaultContainer = null;
        if (typeof document !== 'undefined') {
            _this.setDefaultContainer();
        }
        _this.component = null;
        return _this;
    }
    Viewer.prototype.setDefaultContainer = function () {
        this.defaultContainer = document.createElement('div');
    };
    Viewer.prototype.renderViewer = function () {
        if (this.props.visible || this.component) {
            if (!this.container) {
                if (this.props.container) {
                    this.container = this.props.container;
                }
                else {
                    if (!this.defaultContainer) {
                        this.setDefaultContainer();
                    }
                    this.container = this.defaultContainer;
                    document.body.appendChild(this.container);
                }
            }
            var instance_1 = this;
            ReactDOM.unstable_renderSubtreeIntoContainer(this, <ViewerCore_1.default {...this.props}/>, this.container, function () {
                instance_1.component = this;
            });
        }
    };
    Viewer.prototype.removeViewer = function () {
        if (this.container) {
            var container = this.container;
            ReactDOM.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
            this.container = null;
            this.component = null;
        }
    };
    Viewer.prototype.componentWillUnmount = function () {
        if (this.props.visible && this.props.onClose) {
            this.props.onClose();
        }
        this.removeViewer();
    };
    Viewer.prototype.componentDidMount = function () {
        this.renderViewer();
    };
    Viewer.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.container !== prevProps.container) {
            this.component = null;
            if (this.props.container) {
                if (this.container && !prevProps.container) {
                    document.body.removeChild(this.container);
                }
                this.container = this.props.container;
            }
            else {
                this.container = this.defaultContainer;
                document.body.appendChild(this.container);
            }
        }
        this.renderViewer();
    };
    Viewer.prototype.render = function () {
        return null;
    };
    return Viewer;
}(React.Component));
exports.default = Viewer;
