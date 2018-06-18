import * as React from 'react';

export default class StandardAccessories extends React.Component<any, {}> {

    public render() {
        return (
            <div>
                <button className="topcorner btn-x" onClick={this.props.exit}>x</button>
                <h3><i>Standard accessories for new devices</i></h3>
                <h4>Desktops/Zero Clients:</h4>
                    <li> Wired keyboard </li>
                    <li> Wired mouse </li>
                    <li> Single monitor </li>
                    <li> Dual monitor (optional) </li>
                <h4>Laptops:</h4>
                    <li> Case </li>
                    <li> Docking station (optional) </li>
                    <li> Wired keyboard (optional) </li>
                    <li> Wired mouse (optional) </li>
                    <li> Additional monitor (optional) </li>
                    <br/>
            </div>
        )
    }
}