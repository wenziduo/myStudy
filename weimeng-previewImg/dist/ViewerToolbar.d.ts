import * as React from 'react';
import { ToolbarConfig } from './ViewerProps';
import './index.less';
export interface ViewerToolbarProps {
    prefixCls: string;
    onAction: (config: ToolbarConfig) => void;
    alt: string;
    width: number;
    height: number;
    attribute: boolean;
    zoomable: boolean;
    rotatable: boolean;
    scalable: boolean;
    changeable: boolean;
    downloadable: boolean;
    noImgDetails: boolean;
    toolbars: ToolbarConfig[];
}
export declare const defaultToolbars: ToolbarConfig[];
export default class ViewerToolbar extends React.Component<ViewerToolbarProps, any> {
    handleAction(config: ToolbarConfig): void;
    renderAction: (config: ToolbarConfig) => JSX.Element;
    render(): JSX.Element;
}
