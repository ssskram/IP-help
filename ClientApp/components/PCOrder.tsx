import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import 'isomorphic-fetch';
declare var $: any;

export class PCOrder extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
        // check to see if user is a dept liaison
        fetch('/api/userdata/equipment_check', {
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
                    popup.innerHTML = "<strong>Sorry...</strong><br/>Only departmental liaisons can order PCs."
                }
                $( "#popup" ).dialog( "open" );
            }
        });
        // date fields & select elements
        $('.datepicker').datepicker({
            format: "mm/dd/yyyy"
        });  
        $('.selectpicker').selectpicker();
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
        }
        // tooltip for standard software
        $( "#tooltip" ).tooltip({
            content: 
            "<b>standard software applications:</b><br/><li> MS Office 2013 (Word, Excel, PowerPoint, Outlook, OneNote) </li><li> Adobe Acrobat Reader DC </li><li>Chrome</li><li>IE-11</li><li>Google Earth</li><li>VLC Media Player</li><li>Java 8.15l</li><li>Net Framework</li><li>Silver Light</li><li>Firefox</li><li>VM Ware New Horizon</li><li>7Zip</li>",
            tooltipClass: "software_tooltip"
          });
        // form validation
        $("form").validate({
            messages: {
                Department: 'This field is required',
                MachineType: 'This field is required',
                EmploymentStatus: 'This field is required'
            }
        });
        var validator = $( "form" ).validate();
        $( "#type" ).change(function() {
            validator.element("#type");
        });
        $( "#department" ).change(function() {
            validator.element("#department");
        });
        $( "#ordertype" ).change(function() {
            validator.element("#ordertype");
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
                    url: '/api/Forms/PCOrder',
                    type: 'POST',
                    data: cleandata,
                    success: function () {
                        if (popup) {
                            popup.innerHTML = "<strong>Success!</strong><br/>The Help Desk will be in touch"
                        }
                    },
                    error: function () {
                        if (popup) {
                            popup.innerHTML = "Oops!<br/><storng>Something isn't right</strong><br/>Please logout, log back in, and try again"
                        }
                    }
                }
            );
            $('form').trigger("reset");
            $('.selectpicker').selectpicker('refresh');
        }
    }
    setaccessories() {
        var type = $("#type").val();
        var dept = $("#department").val();
        $('#accessories option').attr("selected",false);
        $('#accessories option').prop("disabled",true);
        if (type == "Desktop")
        {
            $('#accessories').find('.desktop').prop("disabled",false);
        }
        if (type == "Laptop")
        {
            $('#accessories').find('.laptop').prop("disabled",false);
        }
        if (type == "Zero client")
        {
            $('#accessories').find('.zeroclient').prop("disabled",false);
        }
        if ( dept == "Police" || dept == "Public Safety" )
        {
            $('#accessories').find('.speakers').prop("disabled",false);
        }
        if ( dept == "Police" )
        {
            $('#accessories').selectpicker('val', 'Speakers');
        }
        $('.selectpicker').selectpicker('refresh');
    }
    conditionalfields() {
        var type = $("#ordertype").val();
        $('#NewEmployee').attr("hidden",true);
        $('#Replacement').attr("hidden",true);
        if (type == "New")
        {
            $('#NewEmployee').attr("hidden",false);
        }
        if (type == "Existing")
        {
            $('#Replacement').attr("hidden",false);
        }
    }
    public render() {
        return <div className="centered">
            <form>
            <fieldset>
                <div className="row">
                <div className="col-md-10">
                    <h2>Order a new PC</h2>
                    <h4 className="form-h4">fill out all fields and submit</h4>
                    <hr/>
                    <div className="form-group">    
                        <div className="col-md-12">
                            <h4 className="form-h4">Enter your phone number</h4>
                            <input name="CustomerPhone" className="form-control" placeholder="Phone number" required></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                        <h4 className="form-h4">What type of machine are you requesting?</h4>
                            <select name="MachineType" id="type" className="selectpicker btn-form-control" data-style="btn-info" title="Machine type" onChange={this.setaccessories}  required>
                                <option>Desktop</option>
                                <option>Laptop</option>
                                <option>Tablet</option>
                                <option>Zero client</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                        <h4 className="form-h4">Which department will be receiving this machine?</h4>
                            <select name="Department" id="department" className="selectpicker btn-form-control" data-style="btn-info" title="Department" onChange={this.setaccessories} required>
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
                            <h4 className="form-h4">Which employee will be receiving this machine?</h4>
                            <input name="UserName" className="form-control" placeholder="Employee's name"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">What is the employee's network id?</h4>
                            <input name="UserNetworkID" className="form-control" placeholder="Employee's network id"></input>
                        </div>
                    </div>
                
                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">Where is the employee located?</h4>
                            <input name="UserNetworkID" className="form-control" placeholder="Employee's location"  required></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">Is this for a new employee, or an existing staff member?</h4>
                            <select name="EmploymentStatus" id="ordertype" className="selectpicker btn-form-control" data-style="btn-info" title="Employment status" onChange={this.conditionalfields} required>
                                <option>New</option>
                                <option>Existing</option>
                            </select>
                        </div>
                    </div>

                    {/* New employee fields */}
                    <div id="NewEmployee" hidden>
                        <div className="form-group">
                            <div className="col-md-12">
                                <h4 className="form-h4">Is this for a permanent employee, or intern?</h4>
                                <select name="Employee type" className="selectpicker btn-form-control" data-style="btn-info" title="Employment type">
                                    <option>Permanent</option>
                                    <option>Intern</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <h4 className="form-h4">Was a functioning computer plugged into the desk network port in the previous month?</h4>
                                <select name="Employee type" className="selectpicker btn-form-control" data-style="btn-info" title="Yes or no">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Replacement employee fields */}
                    <div id="Replacement" hidden>
                        <div className="form-group">
                            <div className="col-md-12">
                                <h4 className="form-h4">Enter their current computer number</h4>
                                <input name="ComputerNumber" className="form-control" placeholder="Computer number"></input>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h4 className="form-h4">Is their current computer functioning?</h4>
                            <select name="ComputerFunctioning" className="selectpicker btn-form-control" data-style="btn-info" title="Yes or no">
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <h4 className="form-h4">Please enter the OTRS ticket number associated with the replacement</h4>
                                <input name="OTRSTicket" className="form-control" placeholder="OTRS ticket number"></input>
                            </div>
                        </div>

                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">Select the necessary accessories</h4>
                            <select name="Accessories" id="accessories" className="selectpicker btn-form-control" data-style="btn-info" title="Accessories" multiple>
                                <option className="desktop laptop zeroclient" disabled>Keyboard</option>
                                <option className="desktop laptop zeroclient" disabled>Mouse</option>
                                <option className="desktop laptop" disabled>Monitor</option>
                                <option className="laptop" disabled>Docking station</option>
                                <option className="speakers" disabled>Speakers</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <h4 className="form-h4">Identify any other accessories you would like</h4>
                            <textarea name="OtherAccessories" className="form-control" placeholder="Other accessories"></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12" id="tooltip">
                            <h4 className="form-h4">Identify any non-<a title="standard software">standard software</a> applications you would like*</h4>
                            <textarea name="SoftwareApplications" className="form-control" placeholder="Additional software applications"></textarea>
                        </div>
                    </div>
                </div>
                </div>
                <div id="button" className="row">
                    <div className="col-md-10 text-center">
                        <a type="button" id="submit" title="Submit order" value="Submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                    </div>
                </div>
                <div className="text-center col-md-10">
                *Dept. may be responsible for payment of licensed software <br/>
                *Dept. needs to provide surge protector for the computer outlet. I&P will not provide surge protectors with computers
                </div>
                </fieldset>
            </form>

            <div id="overlay"></div>

        </div>;
    }
}