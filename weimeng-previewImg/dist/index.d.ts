import * as React from 'react';
export default class PreviewPicture extends React.Component<any, any> {
    container: HTMLDivElement;
    constructor(props: any);
    componentWillMount(): void;
    getNewImgList: () => any[];
    render(): JSX.Element;
}
export declare const openPicturePreview: (props?: any) => {
    destroy(): void;
};
