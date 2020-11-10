import * as React from 'react';
export interface ViewerCanvasProps {
    prefixCls: string;
    imgSrc: string;
    visible: boolean;
    width: number;
    height: number;
    top: number;
    left: number;
    rotate: number;
    onChangeImgState: (width: number, height: number, top: number, left: number) => void;
    onResize: () => void;
    zIndex: number;
    scaleX: number;
    scaleY: number;
    loading: boolean;
    drag: boolean;
    container: HTMLElement;
    onCanvasMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export interface ViewerCanvasState {
    isMouseDown?: boolean;
    mouseX?: number;
    mouseY?: number;
}
export default class ViewerCanvas extends React.Component<ViewerCanvasProps, ViewerCanvasState> {
    constructor(props: any);
    componentDidMount(): void;
    handleResize: (e: any) => void;
    handleCanvasMouseDown: (e: any) => void;
    handleMouseDown: (e: any) => void;
    handleMouseMove: (e: any) => void;
    handleMouseUp: (e: any) => void;
    bindEvent: (remove?: boolean) => void;
    componentDidUpdate(prevProps: ViewerCanvasProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
