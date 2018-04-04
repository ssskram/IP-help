import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class SelfService extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        $( function() {
            $( "#accordion" ).accordion();
        } );
    }
    public render() {
        return <div className="centered">
        <form>
            <div className="row">
                <div className="col-md-12">
                    <div id="accordion">
                        <h3><strong>Self service</strong></h3>
                        <div>
                        <p>
                        self-serv·ice
                        ˈˌself ˈsərvəs/Submit
                        adjective
                        1.
                        denoting a store, restaurant, or service station where customers select goods for themselves or service their car for themselves and pay a cashier.
                        "a self-service cafeteria"
                        
                        </p>
                        </div>
                        <h3>Hardware</h3>
                        <div>
                        <p>
                        Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet
                        purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor
                        velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In
                        suscipit faucibus urna.
                        </p>
                        </div>
                        <h3>Software</h3>
                        <div>
                        <p>
                        Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis.
                        Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero
                        ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis
                        lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.
                        </p>
                        <ul>
                            <li>List item one</li>
                            <li>List item two</li>
                            <li>List item three</li>
                        </ul>
                        </div>
                        <h3>Workshops</h3>
                        <div>
                        <p>
                        Cras dictum. Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in
                        faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia
                        mauris vel est.
                        </p>
                        <p>
                        Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus.
                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                        inceptos himenaeos.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>;
    }
}