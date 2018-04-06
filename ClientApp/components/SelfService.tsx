import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class SelfService extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
        $( function() {
            $( "#accordion" ).accordion({
                heightStyle: "content"
              });
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
                        </div>
                        <h3 className="ss-spotlight-header"><i>Spotlight:</i><strong>  Readitfor.me</strong></h3>
                        <div>
                        <div className="row ss-center">
                            <h2>Self Service Spotlight</h2>
                            Introducing the new learning resource that is available to all employees!<br/>
                            <strong>Readitfor.me</strong> is a place to learn, retain and apply the ideas from the best personal development books in the world.
                            <hr/>
                        </div>
                        <div className="col-sm-6">
                            <ul>
                            <li>
                            <p>Read, listen or watch video summaries of popular professional books.</p>
                            </li>
                            <li>
                            <p>The service is unlimited, so use it as much as you want!</p>
                            </li>
                            </ul>
                        </div>
                        <div className="col-sm-6">
                            <ul>
                            <li>
                            <p><a href="https://readitfor.me/ pittsburghpa" target="_blank">Follow this link to create an account with your work email.</a></p>
                            </li>
                            <li>
                            <p>Enjoy "speed reading" today!</p>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <h3>Windows 7</h3>
                        <div className="ss-center">
                            <h4><b>User guides</b></h4>     
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Create a folder shortcut
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Create a website shortcut
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Set a default printer
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Find your computer's name
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Map a network drive
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Fax a document from the computer
                            </a>
                        </div>
                        <h3>Windows 10</h3>
                        <div className="ss-center">
                            <h4><b>Training resources</b></h4>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Windows 10
                            </a>
                            <h4><b>User guides</b></h4>                        
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Create a folder shortcut
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Create a website shortcut
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Set a default printer
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Map a network drive
                            </a>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Fax a document from the computer
                            </a>
                        </div>
                        <h3>Microsoft Office 365</h3>
                        <div className="ss-center">
                            <h4><b>Training resources</b></h4>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Microsoft 365
                            </a>
                            <a href="http://portal.office.com/" title="Email and calendar" target="_blank" className="btn btn-selfservice">
                                Outlook 2016
                            </a>
                            <a href="http://portal.office.com/" title="Docs, spreadhseets, and slideshows" target="_blank" className="btn btn-selfservice">
                                Word, Excel, & PowerPoint 2016
                            </a>
                            <a href="http://portal.office.com/" title="Personal cloud storage" target="_blank" className="btn btn-selfservice">
                                OneDrive for Business
                            </a>
                            <a href="http://portal.office.com/" title="Project and team sites" target="_blank" className="btn btn-selfservice">
                                SharePoint Online
                            </a>
                            <a href="http://portal.office.com/" title="Messaging and video chat" target="_blank" className="btn btn-selfservice">
                                Skype for Business
                            </a>
                        </div>
                        <h3>Printers & MFDs</h3>
                        <div className="ss-center">
                            <h4><b>User guides</b></h4>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Printer guides
                            </a>
                            <a href="http://portal.office.com/" title="Email and calendar" target="_blank" className="btn btn-selfservice">
                                Instructions to connect
                            </a>
                            <a href="http://portal.office.com/" title="Docs, spreadhseets, and slideshows" target="_blank" className="btn btn-selfservice">
                                Troubleshooting
                            </a>
                        </div>
                        <h3>Legistar</h3>
                        <div className="ss-center">
                            <h4><b>User guides</b></h4>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Legistar 5
                            </a>
                        </div>
                        <h3>Municode</h3>
                        <div className="ss-center">
                            <h4><b>User guides</b></h4>
                            <a href="http://portal.office.com/" target="_blank" className="btn btn-selfservice">
                                Municode
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>;
    }
}