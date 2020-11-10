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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var classnames_1 = require("classnames");
var Viewer_1 = require("./Viewer");
var PreviewPicture = /** @class */ (function (_super) {
    __extends(PreviewPicture, _super);
    function PreviewPicture(props) {
        var _this = _super.call(this, props) || this;
        // 对图片数据进行处理
        _this.getNewImgList = function () {
            var _a = _this.props, imgList = _a.imgList, currentClickImg = _a.currentClickImg;
            var newUrlData = [];
            imgList.forEach(function (list) {
                var listUrl = [];
                if (list.src instanceof Array) {
                    listUrl = list.src;
                }
                if (typeof (list.src) === 'string' && list.src) {
                    listUrl = list.src.split(',');
                }
                if (listUrl.length > 1) {
                    listUrl.forEach(function (t) {
                        newUrlData.push(__assign(__assign({}, list), { src: t }));
                    });
                }
                else if (listUrl.length === 1) {
                    newUrlData.push(__assign(__assign({}, list), { src: listUrl[0] }));
                }
            });
            var newImgList = newUrlData.map(function (item, i) {
                return __assign(__assign({}, item), { title: item.title || '图片展示', alt: item.alt ? item.alt : (i + 1), downloadUrl: item.downloadUrl ? item.downloadUrl : item.src, indexCode: i });
            });
            var selectInd = newImgList.findIndex(function (m) { return m.title === currentClickImg; });
            _this.setState({
                newImgList: newImgList,
                activeIndex: selectInd > 0 ? selectInd : 0,
            });
            return newImgList;
        };
        _this.state = {
            visible: true,
            activeIndex: 0,
            mode: 'modal',
            newImgList: []
        };
        return _this;
    }
    PreviewPicture.prototype.componentWillMount = function () {
        this.getNewImgList();
    };
    PreviewPicture.prototype.render = function () {
        var _this = this;
        var _a = this.props, onClose = _a.onClose, noNavbar = _a.noNavbar;
        var inline = this.state.mode === 'inline';
        var inlineContainerClass = classnames_1.default('inline-container', {
            show: this.state.visible && inline,
        });
        var _b = this.state, visible = _b.visible, newImgList = _b.newImgList, activeIndex = _b.activeIndex;
        return (<div>
        <div className={inlineContainerClass} ref={function (ref) { _this.container = ref; }}></div>
        <Viewer_1.default visible={visible} onClose={function () {
            _this.setState({ visible: false });
            onClose();
        }} images={newImgList} activeIndex={activeIndex} container={inline ? this.container : null} downloadable zoomSpeed={0.25} noNavbar={noNavbar || newImgList.length < 2} changeable={newImgList.length > 1} defaultImg={{ width: 100, height: 100 }}/>
      </div>);
    };
    return PreviewPicture;
}(React.Component));
exports.default = PreviewPicture;
exports.openPicturePreview = function (props) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    var onClose = function () {
        setTimeout(function () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }, 2);
    };
    ReactDOM.render(<PreviewPicture onClose={onClose} {...props}/>, div);
    return {
        destroy: function () {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
};
