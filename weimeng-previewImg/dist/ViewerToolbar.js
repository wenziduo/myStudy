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
var Icon_1 = require("./Icon");
require("./index.less");
exports.defaultToolbars = [
    {
        key: 'zoomIn',
        actionType: Icon_1.ActionType.zoomIn,
    },
    {
        key: 'zoomOut',
        actionType: Icon_1.ActionType.zoomOut,
    },
    {
        key: 'prev',
        actionType: Icon_1.ActionType.prev,
    },
    {
        key: 'next',
        actionType: Icon_1.ActionType.next,
    },
    {
        key: 'rotateLeft',
        actionType: Icon_1.ActionType.rotateLeft,
    },
    {
        key: 'rotateRight',
        actionType: Icon_1.ActionType.rotateRight,
    },
    // {
    //   key: 'reset',
    //   actionType: ActionType.reset,
    // },
    {
        key: 'download',
        actionType: Icon_1.ActionType.download,
    },
    {
        key: 'close',
        actionType: Icon_1.ActionType.close,
    },
];
function deleteToolbarFromKey(toolbars, keys) {
    var targetToolbar = toolbars.filter(function (item) { return keys.indexOf(item.key) < 0; });
    return targetToolbar;
}
var ViewerToolbar = /** @class */ (function (_super) {
    __extends(ViewerToolbar, _super);
    function ViewerToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderAction = function (config) {
            var content = null;
            // default toolbar
            if (typeof Icon_1.ActionType[config.actionType] !== 'undefined') {
                content = <Icon_1.default type={config.actionType}/>;
            }
            // extra toolbar
            if (config.render) {
                content = config.render;
            }
            return (<li key={config.key} className={_this.props.prefixCls + "-btn"} onClick={function () { _this.handleAction(config); }} data-key={config.key}>
        {content}
      </li>);
        };
        return _this;
    }
    ViewerToolbar.prototype.handleAction = function (config) {
        this.props.onAction(config);
    };
    ViewerToolbar.prototype.render = function () {
        var _this = this;
        var toolbars = this.props.toolbars;
        if (!this.props.zoomable) {
            toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
        }
        if (!this.props.changeable) {
            toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
        }
        if (!this.props.rotatable) {
            toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
        }
        if (!this.props.scalable) {
            toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
        }
        if (!this.props.downloadable) {
            toolbars = deleteToolbarFromKey(toolbars, ['download']);
        }
        return (<div style={{ paddingTop: 6 }}>
        <ul className={this.props.prefixCls + "-toolbar toolbar-other"}>
          {toolbars.map(function (item) {
            return _this.renderAction(item);
        })}
        </ul>
      </div>);
    };
    return ViewerToolbar;
}(React.Component));
exports.default = ViewerToolbar;
