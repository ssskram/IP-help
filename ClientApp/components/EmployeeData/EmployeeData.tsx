import * as React from 'react';

export default class EmployeeData extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Request employee data</h2>
                    <h4 className="form-h">1. Download & complete form</h4>
                    <h4 className="form-h">2. Collect approval from your Director</h4>
                    <h4 className="form-h">3. Collect approval from the Law Department</h4>
                    <h4 className="form-h">4. Deliver form to I&P</h4>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <div className="form-group text-center">
                    <a href='https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Permission_to_View_Email.pdf' className='download-link' target='_blank'>
                        <span className='glyphicon glyphicon-download-alt'></span> Request employee's email records</a>
                    <br/>
                    <a href='https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/Permission_to_View_Wireless.pdf' className='download-link' target='_blank'>
                        <span className='glyphicon glyphicon-download-alt'></span> Request employee's mobile device records</a>
                </div>
            </div>
        </div>;
    }
}