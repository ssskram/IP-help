import * as React from 'react';

const emailIcon = require('./../../images/mail.png')
const mobileIcon = require('./../../images/mobile.png')

const imgSize = {
    height: '100px',
    margin: '10px'
}

const bigFont = {
    fontSize: '25px'
}

export default class EmployeeData extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        return <div className="centered">
            <div className="row text-center">
                <div className="col-md-12">
                    <h1>Request employee data</h1>
                    <h4>1. Download & complete form</h4>
                    <h4>2. Collect approval from your Director</h4>
                    <h4>3. Collect approval from the Law Department</h4>
                    <h4>4. Deliver form to I&P</h4>
                    <br />
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-6 col-md-offset-3">
                    <a href='https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Permission_to_View_Email.pdf' className='btn btn-primary btn-big'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <img style={imgSize} src={emailIcon as string} />
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <span style={bigFont}><b>Email</b></span>
                                </div>
                                <div className='row'>
                                    <i>Request an employee's email records</i>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href='https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Permission_to_View_Wireless.pdf' className='btn btn-primary btn-big'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <img style={imgSize} src={mobileIcon as string} />
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <span style={bigFont}><b>Phone</b></span>
                                </div>
                                <div className='row'>
                                    <i>Request an employee's mobile device records</i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>;
    }
}