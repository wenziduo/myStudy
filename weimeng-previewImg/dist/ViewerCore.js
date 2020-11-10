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
require("./style/index.less");
var ViewerCanvas_1 = require("./ViewerCanvas");
var ViewerNav_1 = require("./ViewerNav");
var ViewerToolbar_1 = require("./ViewerToolbar");
var Icon_1 = require("./Icon");
var constants = require("./constants");
var abbr_1 = require("../abbr");
require("./index.less");
function noop() { }
var transitionDuration = 300;
var ViewerCore = /** @class */ (function (_super) {
    __extends(ViewerCore, _super);
    function ViewerCore(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClose = function (e) {
            // Stop the event from bubbling
            var target = e.target;
            if (target.matches(".react-viewer-canvas") ||
                target.matches(".react-viewer-close")) {
                _this.props.onClose();
            }
        };
        _this.loadImgSuccess = function (activeImage, imgWidth, imgHeight, isNewImage) {
            var realImgWidth = imgWidth;
            var realImgHeight = imgHeight;
            if (_this.props.defaultSize) {
                realImgWidth = _this.props.defaultSize.width;
                realImgHeight = _this.props.defaultSize.height;
            }
            if (activeImage.defaultSize) {
                realImgWidth = activeImage.defaultSize.width;
                realImgHeight = activeImage.defaultSize.height;
            }
            var _a = _this.getImgWidthHeight(realImgWidth, realImgHeight), width = _a[0], height = _a[1];
            var left = (_this.containerWidth - width) / 2;
            var top = (_this.containerHeight - height - _this.footerHeight) / 2;
            var scaleX = _this.props.defaultScale;
            var scaleY = _this.props.defaultScale;
            if (_this.props.noResetZoomAfterChange && isNewImage) {
                scaleX = _this.state.scaleX;
                scaleY = _this.state.scaleY;
            }
            _this.setState({
                width: width,
                height: height,
                left: left,
                top: top,
                imageWidth: imgWidth,
                imageHeight: imgHeight,
                loading: false,
                rotate: 0,
                scaleX: scaleX,
                scaleY: scaleY,
            });
        };
        _this.handleChangeImg = function (newIndex) {
            if (!_this.props.loop && (newIndex >= _this.props.images.length || newIndex < 0)) {
                return;
            }
            if (newIndex >= _this.props.images.length) {
                newIndex = 0;
            }
            if (newIndex < 0) {
                newIndex = _this.props.images.length - 1;
            }
            if (newIndex === _this.state.activeIndex) {
                return;
            }
            if (_this.props.onChange) {
                var activeImage = _this.getActiveImage(newIndex);
                _this.props.onChange(activeImage, newIndex);
            }
            _this.loadImg(newIndex, true);
        };
        _this.handleChangeImgState = function (width, height, top, left) {
            _this.setState({
                width: width,
                height: height,
                top: top,
                left: left,
            });
        };
        _this.handleDefaultAction = function (type) {
            switch (type) {
                case Icon_1.ActionType.prev:
                    _this.handleChangeImg(_this.state.activeIndex - 1);
                    break;
                case Icon_1.ActionType.next:
                    _this.handleChangeImg(_this.state.activeIndex + 1);
                    break;
                case Icon_1.ActionType.zoomIn:
                    var imgCenterXY = _this.getImageCenterXY();
                    _this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, _this.props.zoomSpeed);
                    break;
                case Icon_1.ActionType.zoomOut:
                    var imgCenterXY2 = _this.getImageCenterXY();
                    _this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, _this.props.zoomSpeed);
                    break;
                case Icon_1.ActionType.rotateLeft:
                    _this.handleRotate();
                    break;
                case Icon_1.ActionType.rotateRight:
                    _this.handleRotate(true);
                    break;
                case Icon_1.ActionType.reset:
                    _this.loadImg(_this.state.activeIndex);
                    break;
                case Icon_1.ActionType.scaleX:
                    _this.handleScaleX(-1);
                    break;
                case Icon_1.ActionType.scaleY:
                    _this.handleScaleY(-1);
                    break;
                case Icon_1.ActionType.download:
                    _this.handleDownload();
                    break;
                case Icon_1.ActionType.close:
                    _this.props.onClose();
                    break;
                default:
                    break;
            }
        };
        _this.handleAction = function (config) {
            _this.handleDefaultAction(config.actionType);
            if (config.onClick) {
                var activeImage = _this.getActiveImage();
                config.onClick(activeImage);
            }
        };
        _this.handleDownload = function () {
            var activeImage = _this.getActiveImage();
            if (activeImage.downloadUrl) {
                //   // location.href = activeImage.downloadUrl;
                //   window.open(activeImage.downloadUrl)
                var image_1 = new Image();
                // 解决跨域 Canvas 污染问题
                image_1.setAttribute('crossOrigin', 'anonymous');
                image_1.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = image_1.width;
                    canvas.height = image_1.height;
                    var context = canvas.getContext('2d');
                    context.drawImage(image_1, 0, 0, image_1.width, image_1.height);
                    var url = canvas.toDataURL('image/png'); //得到图片的base64编码数据
                    var a = document.createElement('a'); // 生成一个a元素
                    var event = new MouseEvent('click'); // 创建一个单击事件
                    a.download = activeImage.alt || 'photo'; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image_1.src = activeImage.downloadUrl;
            }
        };
        _this.handleScaleX = function (newScale) {
            _this.setState({
                scaleX: _this.state.scaleX * newScale,
            });
        };
        _this.handleScaleY = function (newScale) {
            _this.setState({
                scaleY: _this.state.scaleY * newScale,
            });
        };
        _this.handleScrollZoom = function (targetX, targetY, direct) {
            _this.handleZoom(targetX, targetY, direct, _this.props.zoomSpeed);
        };
        _this.handleZoom = function (targetX, targetY, direct, scale) {
            var imgCenterXY = _this.getImageCenterXY();
            var diffX = targetX - imgCenterXY.x;
            var diffY = targetY - imgCenterXY.y;
            var top = 0;
            var left = 0;
            var width = 0;
            var height = 0;
            var scaleX = 0;
            var scaleY = 0;
            if (_this.state.width === 0) {
                var _a = _this.getImgWidthHeight(_this.state.imageWidth, _this.state.imageHeight), imgWidth = _a[0], imgHeight = _a[1];
                left = (_this.containerWidth - imgWidth) / 2;
                top = (_this.containerHeight - _this.footerHeight - imgHeight) / 2;
                width = _this.state.width + imgWidth;
                height = _this.state.height + imgHeight;
                scaleX = scaleY = 1;
            }
            else {
                var directX = _this.state.scaleX > 0 ? 1 : -1;
                var directY = _this.state.scaleY > 0 ? 1 : -1;
                scaleX = _this.state.scaleX + scale * direct * directX;
                scaleY = _this.state.scaleY + scale * direct * directY;
                if (Math.abs(scaleX) < 0.1 || Math.abs(scaleY) < 0.1) {
                    return;
                }
                top = _this.state.top + -direct * diffY / _this.state.scaleX * scale * directX;
                left = _this.state.left + -direct * diffX / _this.state.scaleY * scale * directY;
                width = _this.state.width;
                height = _this.state.height;
            }
            _this.setState({
                width: width,
                scaleX: scaleX,
                scaleY: scaleY,
                height: height,
                top: top,
                left: left,
                loading: false,
            });
        };
        _this.getImageCenterXY = function () {
            return {
                x: _this.state.left + _this.state.width / 2,
                y: _this.state.top + _this.state.height / 2,
            };
        };
        _this.handleRotate = function (isRight) {
            if (isRight === void 0) { isRight = false; }
            _this.setState({
                rotate: _this.state.rotate + 90 * (isRight ? 1 : -1),
            });
        };
        _this.handleResize = function () {
            _this.setContainerWidthHeight();
            if (_this.props.visible) {
                var left = (_this.containerWidth - _this.state.width) / 2;
                var top_1 = (_this.containerHeight - _this.state.height - _this.footerHeight) / 2;
                _this.setState({
                    left: left,
                    top: top_1,
                });
            }
        };
        _this.handleKeydown = function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            var isFeatrue = false;
            switch (keyCode) {
                // key: esc
                case 27:
                    _this.props.onClose();
                    isFeatrue = true;
                    break;
                // key: ←
                case 37:
                    if (e.ctrlKey) {
                        _this.handleDefaultAction(Icon_1.ActionType.rotateLeft);
                    }
                    else {
                        _this.handleDefaultAction(Icon_1.ActionType.prev);
                    }
                    isFeatrue = true;
                    break;
                // key: →
                case 39:
                    if (e.ctrlKey) {
                        _this.handleDefaultAction(Icon_1.ActionType.rotateRight);
                    }
                    else {
                        _this.handleDefaultAction(Icon_1.ActionType.next);
                    }
                    isFeatrue = true;
                    break;
                // key: ↑
                case 38:
                    _this.handleDefaultAction(Icon_1.ActionType.zoomIn);
                    isFeatrue = true;
                    break;
                // key: ↓
                case 40:
                    _this.handleDefaultAction(Icon_1.ActionType.zoomOut);
                    isFeatrue = true;
                    break;
                // key: Ctrl + 1
                case 49:
                    if (e.ctrlKey) {
                        _this.loadImg(_this.state.activeIndex);
                        isFeatrue = true;
                    }
                    break;
                default:
                    break;
            }
            if (isFeatrue) {
                e.preventDefault();
            }
        };
        _this.handleTransitionEnd = function () {
            if (!_this.state.transitionEnd || _this.state.visibleStart) {
                _this.setState({
                    visibleStart: false,
                    transitionEnd: true,
                });
            }
        };
        _this.handleCanvasMouseDown = function (e) {
            _this.props.onMaskClick(e);
        };
        _this.getActiveImage = function (activeIndex) {
            if (activeIndex === void 0) { activeIndex = undefined; }
            var activeImg = {
                src: '',
                alt: '',
                downloadUrl: '',
            };
            var images = _this.props.images || [];
            var realActiveIndex = null;
            if (activeIndex !== undefined) {
                realActiveIndex = activeIndex;
            }
            else {
                realActiveIndex = _this.state.activeIndex;
            }
            if (images.length > 0 && realActiveIndex >= 0) {
                activeImg = images[realActiveIndex];
            }
            return activeImg;
        };
        _this.handleMouseScroll = function (e) {
            if (_this.props.disableMouseZoom) {
                return;
            }
            e.preventDefault();
            var direct = 0;
            var value = e.deltaY;
            if (value === 0) {
                direct = 0;
            }
            else {
                direct = value > 0 ? -1 : 1;
            }
            if (direct !== 0) {
                var x = e.clientX;
                var y = e.clientY;
                if (_this.props.container) {
                    var containerRect = _this.props.container.getBoundingClientRect();
                    x -= containerRect.left;
                    y -= containerRect.top;
                }
                _this.handleScrollZoom(x, y, direct);
            }
        };
        _this.prefixCls = 'react-viewer';
        _this.state = {
            visible: false,
            visibleStart: false,
            transitionEnd: false,
            activeIndex: _this.props.activeIndex,
            width: 0,
            height: 0,
            top: 15,
            left: null,
            rotate: 0,
            imageWidth: 0,
            imageHeight: 0,
            scaleX: _this.props.defaultScale,
            scaleY: _this.props.defaultScale,
            loading: false,
            loadFailed: false,
        };
        _this.setContainerWidthHeight();
        _this.footerHeight = constants.FOOTER_HEIGHT;
        return _this;
    }
    ViewerCore.prototype.setContainerWidthHeight = function () {
        this.containerWidth = window.innerWidth;
        this.containerHeight = window.innerHeight;
        if (this.props.container) {
            this.containerWidth = this.props.container.offsetWidth;
            this.containerHeight = this.props.container.offsetHeight;
            this.setInlineContainerHeight();
        }
    };
    ViewerCore.prototype.setInlineContainerHeight = function () {
        var core = this.refs['viewerCore'];
        if (core) {
            this.containerHeight = core.offsetHeight;
        }
    };
    ViewerCore.prototype.startVisible = function (activeIndex) {
        var _this = this;
        if (!this.props.container) {
            document.body.style.overflow = 'hidden';
            if (document.body.scrollHeight > document.body.clientHeight) {
                document.body.style.paddingRight = '15px';
            }
        }
        this.setState({
            visibleStart: true,
        });
        setTimeout(function () {
            _this.setState({
                visible: true,
                activeIndex: activeIndex,
            });
            setTimeout(function () {
                _this.bindEvent();
                _this.loadImg(activeIndex);
            }, 300);
        }, 10);
    };
    ViewerCore.prototype.componentDidMount = function () {
        var core = this.refs['viewerCore'];
        core.addEventListener('transitionend', this.handleTransitionEnd, false);
        // Though onWheel can be directly used on the div "viewerCore", to be able to
        // prevent default action, a listener is added here instead
        this.viewCanvas.addEventListener('mousewheel', this.handleMouseScroll, false);
        if (this.containerHeight === 0) {
            this.setInlineContainerHeight();
        }
        this.startVisible(this.state.activeIndex);
    };
    ViewerCore.prototype.getImgWidthHeight = function (imgWidth, imgHeight) {
        var width = 0;
        var height = 0;
        var maxWidth = this.containerWidth * 0.8;
        var maxHeight = (this.containerHeight - this.footerHeight) * 0.8;
        width = Math.min(maxWidth, imgWidth);
        height = width / imgWidth * imgHeight;
        if (height > maxHeight) {
            height = maxHeight;
            width = height / imgHeight * imgWidth;
        }
        if (this.props.noLimitInitializationSize) {
            width = imgWidth;
            height = imgHeight;
        }
        return [width, height];
    };
    ViewerCore.prototype.loadImg = function (activeIndex, isNewImage) {
        var _this = this;
        if (isNewImage === void 0) { isNewImage = false; }
        var activeImage = null;
        var images = this.props.images || [];
        if (images.length > 0) {
            activeImage = images[activeIndex];
        }
        var loadComplete = false;
        var img = new Image();
        this.setState({
            activeIndex: activeIndex,
            loading: true,
            loadFailed: false,
        }, function () {
            img.onload = function () {
                if (!loadComplete) {
                    _this.loadImgSuccess(activeImage, img.width, img.height, isNewImage);
                }
            };
            img.onerror = function () {
                if (_this.props.defaultImg) {
                    _this.setState({
                        loadFailed: true,
                    });
                    var deafultImgWidth = _this.props.defaultImg.width || _this.containerWidth * .5;
                    var defaultImgHeight = _this.props.defaultImg.height || _this.containerHeight * .5;
                    _this.loadImgSuccess(activeImage, deafultImgWidth, defaultImgHeight, isNewImage);
                }
                else {
                    _this.setState({
                        activeIndex: activeIndex,
                        imageWidth: 0,
                        imageHeight: 0,
                        loading: false,
                    });
                }
            };
            img.src = activeImage.src;
            if (img.complete) {
                loadComplete = true;
                _this.loadImgSuccess(activeImage, img.width, img.height, isNewImage);
            }
        });
    };
    ViewerCore.prototype.bindEvent = function (remove) {
        if (remove === void 0) { remove = false; }
        var funcName = 'addEventListener';
        if (remove) {
            funcName = 'removeEventListener';
        }
        if (!this.props.disableKeyboardSupport) {
            document[funcName]('keydown', this.handleKeydown, false);
        }
    };
    ViewerCore.prototype.componentWillUnmount = function () {
        this.bindEvent(true);
        this.refs['viewerCore'].removeEventListener('transitionend', this.handleTransitionEnd, false);
    };
    ViewerCore.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (this.props.visible && !prevProps.visible) {
            this.startVisible(this.props.activeIndex);
            return;
        }
        if (!this.props.visible && prevProps.visible) {
            this.bindEvent(true);
            this.handleZoom(this.containerWidth / 2, (this.containerHeight - this.footerHeight) / 2, -1, (this.state.scaleX > 0 ? 1 : -1) * this.state.scaleX - 0.11);
            setTimeout(function () {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                _this.setState({
                    visible: false,
                    transitionEnd: false,
                    width: 0,
                    height: 0,
                    scaleX: _this.props.defaultScale,
                    scaleY: _this.props.defaultScale,
                    rotate: 1,
                    imageWidth: 0,
                    imageHeight: 0,
                    loadFailed: false,
                });
            }, transitionDuration);
            return;
        }
        if (this.props.activeIndex !== prevProps.activeIndex) {
            this.handleChangeImg(this.props.activeIndex);
            return;
        }
    };
    ViewerCore.prototype.render = function () {
        var _this = this;
        var activeImg = {
            src: '',
            alt: '',
        };
        var zIndex = 1000;
        if (this.props.zIndex) {
            zIndex = this.props.zIndex;
        }
        var viewerStryle = {
            opacity: this.state.visible ? 1 : 0,
        };
        if (!this.state.visible && this.state.transitionEnd) {
            viewerStryle.display = 'none';
        }
        if (!this.state.visible && this.state.visibleStart) {
            viewerStryle.display = 'block';
        }
        if (this.state.visible && this.state.transitionEnd) {
            activeImg = this.getActiveImage();
        }
        var className = this.prefixCls + " " + this.prefixCls + "-container " + this.prefixCls + "-transition";
        if (this.props.container) {
            className += " " + this.prefixCls + "-inline";
        }
        return (<div ref="viewerCore" className={className} style={viewerStryle} onClick={this.handleClose}>
        <div className="other-tips">
          <div style={{ fontSize: 14 }}>
            {activeImg.alt && typeof (activeImg.alt) === 'string' ? activeImg.alt : null}
            {activeImg.showOtherInfo && activeImg.showOtherInfo.length ? activeImg.showOtherInfo.map(function (item, i) {
            return (<div key={i}><strong>{item.label}：</strong><abbr_1.default text={item.value} length={30}/></div>);
        }) : null}
          </div>
        </div>
        <div>
          <div ref={function (el) { return _this.viewCanvas = el; }}>
            <ViewerCanvas_1.default prefixCls={this.prefixCls} imgSrc={this.state.loadFailed ? this.props.defaultImg.src || activeImg.src : activeImg.src} visible={this.props.visible} width={this.state.width} height={this.state.height} top={this.state.top} left={this.state.left} rotate={this.state.rotate} onChangeImgState={this.handleChangeImgState} onResize={this.handleResize} zIndex={zIndex + 5} scaleX={this.state.scaleX} scaleY={this.state.scaleY} loading={this.state.loading} drag={this.props.drag} container={this.props.container} onCanvasMouseDown={this.handleCanvasMouseDown}/>
          </div>
          {this.props.noFooter || (<div className={this.prefixCls + "-footer"} style={{ zIndex: zIndex + 5, width: '25%', maxWidth: 300 }}>
              {this.props.noToolbar || (<ViewerToolbar_1.default prefixCls={this.prefixCls} onAction={this.handleAction} alt={activeImg.alt} width={this.state.imageWidth} height={this.state.imageHeight} attribute={this.props.attribute} zoomable={this.props.zoomable} rotatable={this.props.rotatable} scalable={this.props.scalable} changeable={this.props.changeable} downloadable={this.props.downloadable} noImgDetails={this.props.noImgDetails} toolbars={this.props.customToolbar(ViewerToolbar_1.defaultToolbars)}/>)}
              {this.props.noNavbar || (<ViewerNav_1.default prefixCls={this.prefixCls} images={this.props.images} activeIndex={this.state.activeIndex} onChangeImg={this.handleChangeImg}/>)}
            </div>)}
        </div>
      </div>);
    };
    ViewerCore.defaultProps = {
        visible: false,
        onClose: noop,
        images: [],
        activeIndex: 0,
        zIndex: 1000,
        drag: true,
        attribute: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        onMaskClick: noop,
        changeable: true,
        customToolbar: function (toolbars) { return toolbars; },
        zoomSpeed: .05,
        disableKeyboardSupport: false,
        noResetZoomAfterChange: false,
        noLimitInitializationSize: false,
        defaultScale: 1,
        loop: true,
        disableMouseZoom: false,
    };
    return ViewerCore;
}(React.Component));
exports.default = ViewerCore;
