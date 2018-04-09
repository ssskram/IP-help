import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class NetworkRegistration extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
        $('.datepicker').datepicker({
            format: "mm/dd/yyyy"
        });  
        $('.selectpicker').selectpicker();
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
        }
    }
    handleSubmit() {
        var data = $('form').serialize(); 
        var cleandata = data.replace(/\'/g, '');
        $.ajax(
            {
                url: '/api/Forms/NetworkRegistration',
                type: 'POST',
                data: cleandata,
                success: function () {
                    var body = document.getElementById('success');
                    if (body) {
                        body.innerHTML = "Success!<br/>Check your email for confirmation"
                      }
                },
                error: function () {
                    var body = document.getElementById('success');
                    if (body) {
                        body.innerHTML = "Oops!<br/>Something isn't right<br/>Please logout, log back in, and try again"
                      }
                }
            }
        );
        $( "#success" ).dialog( "open" );
    }
    public render() {
        return <div className="centered">
        <form>
            <div className="row">
                <div className="col-md-10">
                <h2>Request a new user account</h2>
                <h4 className="form-h4">complete all fields and submit</h4>
                <hr/>
                </div>
            </div>
            <div className="row">
            <div className="col-md-10">
                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is the employee's first name?</h4>
                            <input name="FirstName" className="form-control" placeholder="Employmee's first name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is the employee's last name?</h4>
                            <input name="LastName" className="form-control" placeholder="Employmee's last name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is their employment type?</h4>
                            <input name="EmploymentType" className="form-control" placeholder="Employment type"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">When did they start, or transfer?</h4>
                            <input name="StartDate" className="form-control datepicker" placeholder="Start/transfer date" readOnly></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is their employee ID number?</h4>
                            <input name="EmployeeID" className="form-control" placeholder="Employee ID number"></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is their department?</h4>
                            <select name="Department" className="selectpicker btn-form-control" data-style="btn-info" title="Department">
                                <option>Animal Control</option>
                                <option>Bureau of Neighborhood Empowerment</option>
                                <option>Citiparks</option>
                                <option>Citizen’s Police Review Board</option>
                                <option>City Clerk</option>
                                <option>City Controller</option>
                                <option>City Council</option>
                                <option>City Planning</option>
                                <option>Commission on HR</option>
                                <option>Community Affairs</option>
                                <option>DOMI</option>
                                <option>EMA</option>
                                <option>EMS</option>
                                <option>EORC</option>
                                <option>Ethics Hearing Board</option>
                                <option>Finance</option>
                                <option>Fire</option>
                                <option>HR</option>
                                <option>Innovation and Performance</option>
                                <option>Law</option>
                                <option>Mayor’s Office</option>
                                <option>OMB</option>
                                <option>OMI</option>
                                <option>Pension</option>
                                <option>Pittsburgh Partnership</option>
                                <option>PLI</option>
                                <option>Police</option>
                                <option>Public Safety</option>
                                <option>Public Works</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is their team, or division?</h4>
                            <input name="Division" className="form-control" placeholder="Division"></input>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is their job title?</h4>
                            <input name="JobTitle" className="form-control" placeholder="Job title"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What email distribution lists should the employee be included on?</h4>
                            <input name="EmailDistribution" className="form-control" placeholder="Email distribution lists"></input>
                        </div>
                     </div>
                    
                     <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">If applicable, what is their employment end date?</h4>
                            <input name="EndDate" className="form-control datepicker" placeholder="Employment end date" readOnly></input>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 networkreg-contactinfo" id="networkregcontact">
                        <h4 className="form-h4">Employee's contact information</h4>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="Address" className="form-control" placeholder="Address"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="Room" className="form-control" placeholder="Room, floor, or office"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="City" className="form-control" placeholder="City"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="State" className="form-control" placeholder="State"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="Zip" className="form-control" placeholder="Zipcode"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="Telephone" className="form-control" placeholder="Telephone number"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <input name="Fax" className="form-control" placeholder="Fax number"></input>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-1"></div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">Do you have any additional comments?</h4>
                            <textarea name="Comments" className="form-control" placeholder="Additional details"></textarea>
                        </div>
                    </div>
                
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 text-center">
                    <NavLink to={ '/' } type="button" id="submit" title="Submit order" value="Submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</NavLink>
                </div>
            </div>
        </form>
    </div>;
    }
}