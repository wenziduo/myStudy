import * as React from 'react';
import ViewerProps from './ViewerProps';
export default class Viewer extends React.Component<ViewerProps, any> {
    private defaultContainer;
    private container;
    private component;
    constructor(props: any);
    setDefaultContainer(): void;
    renderViewer(): void;
    removeViewer(): void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ViewerProps): void;
    render(): any;
}
