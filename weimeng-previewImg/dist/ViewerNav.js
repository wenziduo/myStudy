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
require("./index.less");
var ViewerNav = /** @class */ (function (_super) {
    __extends(ViewerNav, _super);
    function ViewerNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChangeImg = function (newIndex) {
            if (_this.props.activeIndex === newIndex) {
                return;
            }
            _this.props.onChangeImg(newIndex);
        };
        _this.getGroupData = function (data, key) {
            var groups = {};
            data.forEach(function (item) {
                var value = item[key];
                groups[value] = groups[value] || [];
                groups[value].push(__assign(__assign({}, item), { urlData: [{
                            url: item.src,
                            ind: item.indexCode
                        }] }));
            });
            Object.keys(groups).forEach(function (item) {
                if (groups[item].length) {
                    var newArr_1 = [];
                    groups[item].forEach(function (t, index) {
                        var flag = true;
                        if (newArr_1.length > 0) {
                            for (var i = 0; i < newArr_1.length; i++) {
                                if (newArr_1[i].alt === t.alt) {
                                    newArr_1[i].urlData.push({
                                        url: t.src,
                                        ind: t.indexCode
                                    });
                                    flag = false;
                                    break;
                                }
                            }
                        }
                        if (flag) {
                            newArr_1.push(t);
                        }
                    });
                    groups[item] = newArr_1;
                }
            });
            return groups;
        };
        return _this;
    }
    ViewerNav.prototype.render = function () {
        var _this = this;
        var newData = this.getGroupData(this.props.images, 'title');
        var title = Object.keys(newData);
        return (<div className={this.props.prefixCls + "-navbar"}>
        <div className="nav-preview">
          {title.map(function (item) {
            return (<div>
                <div className="nav-title">{item}</div>
                <ul>
                  {newData[item].map(function (imgData, index) {
                return (<li key={imgData.indexCode}>
                        <p className="tip-title">{imgData.alt}</p>
                        {imgData.urlData.map(function (urlDa) {
                    return (<span key={urlDa.ind} style={{ display: 'inline-block' }} className={urlDa.ind === _this.props.activeIndex ? 'active-img' : ''} onClick={function () { _this.handleChangeImg(urlDa.ind); }}>
                              <img src={urlDa.url} alt={imgData.alt} style={{ width: '90px', height: '100px' }}/>
                            </span>);
                })}
                      </li>);
            })}
                </ul>
              </div>);
        })}
        </div>
      </div>);
    };
    ViewerNav.defaultProps = {
        activeIndex: 0,
    };
    return ViewerNav;
}(React.Component));
exports.default = ViewerNav;
