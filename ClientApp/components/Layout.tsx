import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <div className='row'><NavMenu user='string'/></div>
                </div>
                <div className='col-sm-9 containing-window'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}