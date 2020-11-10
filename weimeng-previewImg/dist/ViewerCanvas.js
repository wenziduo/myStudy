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
var classnames_1 = require("classnames");
var ViewerCanvas = /** @class */ (function (_super) {
    __extends(ViewerCanvas, _super);
    function ViewerCanvas(props) {
        var _this = _super.call(this, props) || this;
        _this.handleResize = function (e) {
            _this.props.onResize();
        };
        _this.handleCanvasMouseDown = function (e) {
            _this.props.onCanvasMouseDown(e);
            _this.handleMouseDown(e);
        };
        _this.handleMouseDown = function (e) {
            if (e.button !== 0) {
                return;
            }
            if (!_this.props.visible || !_this.props.drag) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            _this.setState({
                isMouseDown: true,
                mouseX: e.nativeEvent.clientX,
                mouseY: e.nativeEvent.clientY,
            });
        };
        _this.handleMouseMove = function (e) {
            if (_this.state.isMouseDown) {
                var diffX = e.clientX - _this.state.mouseX;
                var diffY = e.clientY - _this.state.mouseY;
                _this.setState({
                    mouseX: e.clientX,
                    mouseY: e.clientY,
                });
                _this.props.onChangeImgState(_this.props.width, _this.props.height, _this.props.top + diffY, _this.props.left + diffX);
            }
        };
        _this.handleMouseUp = function (e) {
            _this.setState({
                isMouseDown: false,
            });
        };
        _this.bindEvent = function (remove) {
            var funcName = 'addEventListener';
            if (remove) {
                funcName = 'removeEventListener';
            }
            document[funcName]('click', _this.handleMouseUp, false);
            document[funcName]('mousemove', _this.handleMouseMove, false);
            window[funcName]('resize', _this.handleResize, false);
        };
        _this.state = {
            isMouseDown: false,
            mouseX: 0,
            mouseY: 0,
        };
        return _this;
    }
    ViewerCanvas.prototype.componentDidMount = function () {
        if (this.props.drag) {
            this.bindEvent();
        }
    };
    ViewerCanvas.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.visible && !prevProps.visible) {
            if (this.props.drag) {
                return this.bindEvent();
            }
        }
        if (!this.props.visible && prevProps.visible) {
            this.handleMouseUp({});
            if (this.props.drag) {
                return this.bindEvent(true);
            }
        }
        if (!this.props.drag && prevProps.drag) {
            return this.bindEvent(true);
        }
        if (this.props.drag && !prevProps.drag) {
            if (this.props.visible) {
                return this.bindEvent(true);
            }
        }
    };
    ViewerCanvas.prototype.componentWillUnmount = function () {
        this.bindEvent(true);
    };
    ViewerCanvas.prototype.render = function () {
        var _a;
        var imgStyle = {
            width: this.props.width + "px",
            height: this.props.height + "px",
            transform: "\ntranslateX(" + (this.props.left !== null ? this.props.left + 'px' : 'aoto') + ") translateY(" + this.props.top + "px)\n      rotate(" + this.props.rotate + "deg) scaleX(" + this.props.scaleX + ") scaleY(" + this.props.scaleY + ")",
        };
        var imgClass = classnames_1.default(this.props.prefixCls + "-image", (_a = {
                drag: this.props.drag
            },
            _a[this.props.prefixCls + "-image-transition"] = !this.state.isMouseDown,
            _a));
        var style = {
            zIndex: this.props.zIndex,
        };
        var imgNode = null;
        if (this.props.imgSrc !== '') {
            imgNode = <img className={imgClass} src={this.props.imgSrc} style={imgStyle} onMouseDown={this.handleMouseDown}/>;
        }
        if (this.props.loading) {
            imgNode = (<div style={{
                display: 'flex',
                height: window.innerHeight - 84 + "px",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
        </div>);
        }
        return (<div className={this.props.prefixCls + "-canvas"} onMouseDown={this.handleCanvasMouseDown} style={style}>
        {imgNode}
      </div>);
    };
    return ViewerCanvas;
}(React.Component));
exports.default = ViewerCanvas;
