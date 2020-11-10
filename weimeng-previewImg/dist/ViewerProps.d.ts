/// <reference types="react" />
export interface ViewerImageSize {
    width: number;
    height: number;
}
export interface ImageDecorator {
    src: string;
    alt?: string;
    downloadUrl?: string;
    defaultSize?: ViewerImageSize;
    showOtherInfo?: any[];
}
export interface ToolbarConfig {
    key: string;
    actionType?: number;
    render?: React.ReactNode;
    onClick?: (activeImage: ImageDecorator) => void;
}
export interface ViewerDefaultImg {
    src: string;
    width?: number;
    height?: number;
}
interface ViewerProps {
    visible?: boolean;
    onClose?: () => void;
    images?: ImageDecorator[];
    activeIndex?: number;
    zIndex?: number;
    container?: HTMLElement;
    drag?: boolean;
    attribute?: boolean;
    zoomable?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    onMaskClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    downloadable?: boolean;
    loop?: boolean;
    noClose?: boolean;
    noImgDetails?: boolean;
    noNavbar?: boolean;
    noToolbar?: boolean;
    noFooter?: boolean;
    changeable?: boolean;
    customToolbar?: (toolbars: ToolbarConfig[]) => ToolbarConfig[];
    zoomSpeed?: number;
    defaultSize?: ViewerImageSize;
    defaultImg?: ViewerDefaultImg;
    disableKeyboardSupport?: boolean;
    noResetZoomAfterChange?: boolean;
    noLimitInitializationSize?: boolean;
    defaultScale?: number;
    onChange?: (activeImage: ImageDecorator, index: number) => void;
    disableMouseZoom?: boolean;
}
export default ViewerProps;
