import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class NetworkRegistration extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        fetch('/api/ping/pong', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    window.location.reload();
                }
            });

        // check to see if user is a dept liaison
        fetch('/api/userdata/network_check', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    var overlay = document.getElementById("overlay");
                    if (overlay) {
                        overlay.style.display = "block";
                    }
                    var popup = document.getElementById('popup');
                    if (popup) {
                        popup.innerHTML = "<strong>Sorry...</strong><br/>Only certain people can request new network accounts"
                    }
                    $("#popup").dialog("open");
                }
            });

        // date fields & select elements
        $('.datepicker').datepicker({
            format: "mm/dd/yyyy",
            changeMonth: true,
            changeYear: true
        });
        $('.selectpicker').selectpicker();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.selectpicker').selectpicker('mobile');
        }
        // form validation
        $("form").validate({
            messages: {
                Department: 'This field is required',
                EmploymentType: 'This field is required',
                FirstName: 'This field is required',
                LastName: 'This field is required',
                StartDate: 'This field is required',
                JobTitle: 'This field is required',
                Address: 'This field is required',
                City: 'This field is required',
                State: 'This field is required',
                Zipcode: 'This field is required',
                Telephone: 'This field is required',
                Fax: 'This field is required',
                SubmitterName: 'This field is required',
                SubmitterNetworkID: 'This field is required'
            }
        });
        var validator = $("form").validate();
        $("#Department").change(function () {
            validator.element("#Department");
        });
        $("#EmploymentType").change(function () {
            validator.element("#EmploymentType");
        });
        // multi-use popup
        $("#popup").dialog({
            autoResize: true,
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
            $("#popup").dialog("open");
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
    autoexpand() {
        var heightLimit = 300;
        var comments = document.getElementById("Comments");
        if (comments) {
            comments.style.height = "";
            comments.style.height = Math.min(comments.scrollHeight, heightLimit) + "px";
        }
    }
    public render() {
        return <div className="centered">
            <form>
                <div className="row">
                    <div className="col-md-10">
                        <h2>Request a new network registration or transfer</h2>
                        <h4 className="form-h4">complete all fields and submit</h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is your name?</h4>
                                <label htmlFor="SubmitterName" className="error" hidden></label>
                                <input name="SubmitterName" className="form-control" placeholder="Your name" required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is your network ID?</h4>
                                <label htmlFor="SubmitterNetworkID" className="error" hidden></label>
                                <input name="SubmitterNetworkID" className="form-control" placeholder="Your network ID" required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is the employee's first name?</h4>
                                <label htmlFor="FirstName" className="error" hidden></label>
                                <input name="FirstName" className="form-control" placeholder="Employee's first name" required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is the employee's last name?</h4>
                                <label htmlFor="LastName" className="error" hidden></label>
                                <input name="LastName" className="form-control" placeholder="Employee's last name" required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is their employment type?</h4>
                                <label htmlFor="EmploymentType" className="error" hidden></label>
                                <select name="EmploymentType" id="EmploymentType" className="selectpicker btn-form-control" data-style="btn-info" title="Employment type" required>
                                    <option>New</option>
                                    <option>Transfer</option>
                                    <option>Consultant</option>
                                    <option>Temporary</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">When did they start, or transfer?</h4>
                                <label htmlFor="StartDate" className="error" hidden></label>
                                <input name="StartDate" className="form-control datepicker" placeholder="Start/transfer date" readOnly required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is their employee ID number?</h4>
                                <input name="EmployeeID" className="form-control" placeholder="Employee ID number" title="This can be found on the employee's paycheck"></input>
                                <div className='form-tip'>*If you don't yet have it, please submit within 90 days to avoid account being disabled</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What is their department?</h4>
                                <label htmlFor="Department" className="error" hidden></label>
                                <select name="Department" id="Department" className="selectpicker btn-form-control" data-style="btn-info" title="Department" required>
                                    <option>Citizen Police Review Board</option>
                                    <option>City Council</option>
                                    <option>City Planning</option>
                                    <option>Commission on Human Relations</option>
                                    <option>Controllers Office</option>
                                    <option>Department of Mobility and Infrastructure</option>
                                    <option>Emergency Management Administration</option>
                                    <option>Emergency Medical Services</option>
                                    <option>Finance Department</option>
                                    <option>Fire Bureau</option>
                                    <option>HRSC-Pittsburgh Partnership</option>
                                    <option>Human Resources and Civil Service</option>
                                    <option>Innovation and Performance</option>
                                    <option>Law Department</option>
                                    <option>Mayors Office</option>
                                    <option>OMB</option>
                                    <option>OMI</option>
                                    <option>Parks and Recreation</option>
                                    <option>Pension</option>
                                    <option>Permits Lic. and Inspection</option>
                                    <option>Personnel and Civil Service Commission</option>
                                    <option>Police Bureau</option>
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
                                <label htmlFor="JobTitle" className="error" hidden></label>
                                <input name="JobTitle" className="form-control" placeholder="Job title" required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">What email distribution lists should the employee be included on?</h4>
                                <input name="EmailDistribution" className="form-control" defaultValue="Department Standards" placeholder="Email distribution lists"></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">If applicable, what is their employment end date?</h4>
                                <input name="EndDate" className="form-control datepicker" placeholder="Employment end date" readOnly></input>
                                <div className='form-tip'>*If permanent leave blank</div>
                            </div>
                        </div>

                        <div className="row form-element">
                            <div className="col-md-1"></div>
                            <div className="col-md-10 networkreg-contactinfo" id="networkregcontact">
                                <h4 className="form-h4">Employee's contact information</h4>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>Address:</div>
                                        <label htmlFor="Address" className="error" hidden></label>
                                        <input name="Address" className="form-control" placeholder="Address" required></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>Room/Floor:</div>
                                        <input name="Room" className="form-control" placeholder="Room, floor, or office"></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>City:</div>
                                        <label htmlFor="City" className="error" hidden></label>
                                        <input name="City" className="form-control" defaultValue="Pittsburgh" placeholder="City" required></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>State:</div>
                                        <label htmlFor="State" className="error" hidden></label>
                                        <input name="State" className="form-control" defaultValue="Pennsylvania" placeholder="State" required></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>Zipcode:</div>
                                        <label htmlFor="Zip" className="error" hidden></label>
                                        <input name="Zip" className="form-control" defaultValue="15219" placeholder="Zipcode" required></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>Telephone number:</div>
                                        <label htmlFor="Telephone" className="error" hidden></label>
                                        <input name="Telephone" className="form-control" defaultValue="(412) 255-0000" placeholder="Telephone number" required></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className='form-tip'>Fax number:</div>
                                        <label htmlFor="Fax" className="error" hidden></label>
                                        <input name="Fax" className="form-control" defaultValue="(412) 255-0000" placeholder="Fax number" required></input>
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
                        <a type="button" id="submit" title="Submit order" defaultValue="Submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                    </div>
                </div>
            </form>

            <div id="overlay"></div>

        </div>;
    }
}