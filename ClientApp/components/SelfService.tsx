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
                        <h3>Self service</h3>
                        <div>
                        <p>
                        <div className="def-title">
                            self-serv·ice        
                        </div>
                        <div className="def-disamb">
                            /ˈˌself ˈsərvəs/
                        </div>
                        <div className="def-adj">
                            adjective
                        </div>
                        <div className="def">
                            <ol>
                                <li><p>of, for, or pertaining to something designed to be used or enjoyed without the aid of an attendant</p></li>
                            </ol>
                        </div>
                        <hr/>
                        <h2 className="text-center">These resources are for you</h2>
                        <h4 className="text-center">if something is missing, please let us know</h4>
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