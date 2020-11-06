import * as React from 'react';
import { ImageDecorator } from './ViewerProps';
import './index.less';

export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
}

export default class ViewerNav extends React.Component<ViewerNavProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };

  handleChangeImg = (newIndex) => {
    if (this.props.activeIndex === newIndex) {
      return;
    }
    this.props.onChangeImg(newIndex);
  }

  getGroupData = (data, key) => {
    const groups = {};
    data.forEach(item => {
      const value = item[key];
      groups[value] = groups[value] || [];

      groups[value].push({
        ...item,
        urlData: [{
          url: item.src,
          ind: item.indexCode
        }]
      });
    });

    Object.keys(groups).forEach(item => {
      if (groups[item].length) {
        const newArr = [];
        groups[item].forEach((t, index) => {
          let flag = true;
          if (newArr.length > 0) {
            for (let i = 0; i < newArr.length; i++) {
              if (newArr[i].alt === t.alt) {
                newArr[i].urlData.push({
                  url: t.src,
                  ind: t.indexCode
                })
                flag = false;
                break;
              }
            }
          }
          if (flag) {
            newArr.push(t)
          }
        })

        groups[item] = newArr;
      }
    });

    return groups;
  }

  render() {

    const newData = this.getGroupData(this.props.images, 'title');

    const title = Object.keys(newData);

    return (
      <div className={`${this.props.prefixCls}-navbar`}>
        <div className="nav-preview">
          {title.map(item => {
            return (
              <div>
                <div className="nav-title">{item}</div>
                <ul>
                  {newData[item].map((imgData, index) => {
                    return (
                      <li
                        key={imgData.indexCode}
                      >
                        <p className="tip-title">{imgData.alt}</p>
                        {imgData.urlData.map((urlDa) => {
                          return (
                            <span
                              key={urlDa.ind}
                              style={{ display: 'inline-block' }}
                              className={urlDa.ind === this.props.activeIndex ? 'active-img' : ''}
                              onClick={() => { this.handleChangeImg(urlDa.ind); }}
                            >
                              <img
                                src={urlDa.url} alt={imgData.alt} style={{ width: '90px', height: '100px' }}
                              />
                            </span>
                          )
                        })}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
