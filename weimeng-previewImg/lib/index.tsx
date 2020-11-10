
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Viewer from './Viewer';

export default class PreviewPicture extends React.Component<any, any> {
  container: HTMLDivElement;
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      activeIndex: 0,
      mode: 'modal',
      newImgList: []
    }
  }

  componentWillMount() {
    this.getNewImgList();
  }

  // 对图片数据进行处理
  getNewImgList = () => {
    const { imgList, currentClickImg } = this.props;
    const newUrlData = [];

    imgList.forEach(list => {  // 对存在多条图片或图片为空处理
      let listUrl = []
      if (list.src instanceof Array) {
        listUrl = list.src
      }
      if (typeof (list.src) === 'string' && list.src) {
        listUrl = list.src.split(',');
      }

      if (listUrl.length > 1) {
        listUrl.forEach(t => {
          newUrlData.push({
            ...list,
            src: t,
          })
        })
      } else if (listUrl.length === 1) {
        newUrlData.push({
          ...list,
          src: listUrl[0],
        })
      }
    })

    const newImgList = newUrlData.map((item, i) => { // 给数据添加唯一标识
      return {
        ...item,
        title: item.title || '图片展示',
        alt: item.alt ? item.alt : (i + 1),
        downloadUrl: item.downloadUrl ? item.downloadUrl : item.src,
        indexCode: i
      }
    })

    const selectInd = newImgList.findIndex(m => m.title === currentClickImg)

    this.setState({
      newImgList,
      activeIndex: selectInd > 0 ? selectInd : 0,
    })

    return newImgList;
  }

  render() {
    const { onClose, noNavbar } = this.props;
    const inline = this.state.mode === 'inline';

    const inlineContainerClass = classNames('inline-container', {
      show: this.state.visible && inline,
    });

    const { visible, newImgList, activeIndex } = this.state;

    return (
      <div>
        <div className={inlineContainerClass} ref={ref => { this.container = ref; }}></div>
        <Viewer
          visible={visible}
          onClose={() => {
            this.setState({ visible: false });
            onClose();
          }}
          images={newImgList}
          activeIndex={activeIndex}
          container={inline ? this.container : null}
          downloadable
          zoomSpeed={0.25}
          noNavbar={noNavbar || newImgList.length < 2}
          changeable={newImgList.length > 1}
          // defaultImg={{ width: 100, height: 100 }}
        />
      </div>
    )
  }
}

export const openPicturePreview = (props?: any) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const onClose = () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }, 2);
  }
  ReactDOM.render(
    <PreviewPicture
      onClose={onClose}
      {...props}
    />, div);
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}
