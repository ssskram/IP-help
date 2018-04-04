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
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </p>
                        </div>
                        <h3>Hardware</h3>
                        <div>
                        <p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </p>
                        </div>
                        <h3>Software</h3>
                        <div>
                        <p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </p>
                        <ul>

                        </ul>
                        </div>
                        <h3>Workshops</h3>
                        <div>
                        <p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </p>
                        <p>

                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>;
    }
}