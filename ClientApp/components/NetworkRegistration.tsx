import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class NetworkRegistration extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
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
                <h4>your information</h4>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <input label="NetworkID" name="Department" className="form-control" placeholder="Enter your network ID"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
            <div className="col-md-10">
                <h4>employee's information</h4>
                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="EmploymentType" className="form-control" placeholder="Employment type"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="FirstName" className="form-control" placeholder="Employmee's first name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="FirstName" className="form-control" placeholder="Employmee's last name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="StartDate" className="form-control datepicker" placeholder="Start/transfer date" readOnly></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="EmployeeID" className="form-control" placeholder="Employee ID number"></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <select name="Department" className="selectpicker form-control" data-style="btn-info" title="Department">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="Division" className="form-control" placeholder="Division"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="JobTitle" className="form-control" placeholder="Job title"></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="Address1" className="form-control" placeholder="Address"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="Address2" className="form-control" placeholder="Address cont'd"></input>
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

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="EmailDistribution" className="form-control" placeholder="Email distribution lists"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <textarea name="Comments" className="form-control" placeholder="Additional details"></textarea>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="EndDate" className="form-control datepicker" placeholder="Employment end date" readOnly></input>
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