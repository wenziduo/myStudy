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
    static defaultProps: {
        activeIndex: number;
    };
    handleChangeImg: (newIndex: any) => void;
    getGroupData: (data: any, key: any) => {};
    render(): JSX.Element;
}
