import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class NetworkRegistration extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
        // check to see if user is a dept liaison
        fetch('/api/userdata/network_check', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data == 0)
            {
                var overlay = document.getElementById("overlay");
                if (overlay) {
                    overlay.style.display = "block";
                }
                var popup = document.getElementById('popup');
                if (popup) {
                    popup.innerHTML = "<strong>Sorry...</strong><br/>Only certain people can request new network accounts"
                }
                $( "#popup" ).dialog( "open" );
            }
        });
        $('.datepicker').datepicker({
            format: "mm/dd/yyyy",
            changeMonth: true,
            changeYear: true
        });  
        $('.selectpicker').selectpicker();
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
        }
        // form validation
        $("form").validate({
            messages: {
                Department: 'This field is required'
            }
        });
        var validator = $( "form" ).validate();
        $( "#Department" ).change(function() {
            validator.element("#Department");
        });
        // multi-use popup
        $( "#popup" ).dialog({
            autoResize:true,
            modal: true,
            autoOpen: false,
            close: function () {
                var popup = document.getElementById('popup');
                if (popup) {
                    popup.innerHTML = ""
                }
            }
        });
    }
    handleSubmit() {
        window.scrollTo(0, 0)
        if ($("form").valid()) {
            var popup = document.getElementById('popup');
            var data = $('form').serialize(); 
            var cleandata = data.replace(/\'/g, '');
            $( "#popup" ).dialog( "open" );
            if (popup) {
                popup.innerHTML = "Sending your request to someone who can help..."
            }
            $.ajax(
                {
                    url: '/api/Forms/NetworkRegistration',
                    type: 'POST',
                    data: cleandata,
                    success: function () {
                        if (popup) {
                            popup.innerHTML = "<b>Success!</b><br/>The Help Desk will be in touch"
                          }
                    },
                    error: function () {
                        if (popup) {
                            popup.innerHTML = "Oops!<br/>Something isn't right<br/>Please logout, log back in, and try again"
                          }
                    }
                }
            );
            $('form').trigger("reset");
            $('.selectpicker').selectpicker('refresh');
        }
    }
    autoexpand () {
        var heightLimit = 300;
        var comments = document.getElementById("Comments");
        if (comments)
        {
            comments.style.height = "";
            comments.style.height = Math.min(comments.scrollHeight, heightLimit) + "px";
        }
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
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is the employee's first name?</h4>
                            <input name="FirstName" className="form-control" placeholder="Employee's first name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is the employee's last name?</h4>
                            <input name="LastName" className="form-control" placeholder="Employee's last name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is their employment type?</h4>
                            <select name="EmploymentType" className="selectpicker btn-form-control" data-style="btn-info" title="Employment type">
                                <option>New</option>
                                <option>Transfer</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">When did they start, or transfer?</h4>
                            <input name="StartDate" className="form-control datepicker" placeholder="Start/transfer date" readOnly></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is their employee ID number?</h4>
                            <input name="EmployeeID" className="form-control" placeholder="Employee ID number"></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is their department?</h4>
                            <label htmlFor="Department" className="error" hidden></label>
                            <select name="Department" id="Department" className="selectpicker btn-form-control" data-style="btn-info" title="Department" required>
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
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is their team, or division?</h4>
                            <input name="Division" className="form-control" placeholder="Division"></input>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What is their job title?</h4>
                            <input name="JobTitle" className="form-control" placeholder="Job title"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">What email distribution lists should the employee be included on?</h4>
                            <input name="EmailDistribution" className="form-control" placeholder="Email distribution lists"></input>
                        </div>
                     </div>
                    
                     <div className="form-group">
                        <div className="col-md-12 form-element">
                            <h4 className="form-h4">If applicable, what is their employment end date?</h4>
                            <input name="EndDate" className="form-control datepicker" placeholder="Employment end date" readOnly></input>
                        </div>
                    </div>

                    <div className="row form-element">
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
                            <textarea name="Comments" id="Comments" className="form-control" placeholder="Additional details" onChange={this.autoexpand}></textarea>
                        </div>
                    </div>
                
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 text-center">
                    <a type="button" id="submit" title="Submit order" value="Submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                </div>
            </div>
        </form>

        <div id="overlay"></div>
        
    </div>;
    }
}