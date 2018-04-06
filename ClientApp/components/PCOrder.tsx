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
        var data = $('form').serialize(); 
        var cleandata = data.replace(/\'/g, '');
        var popup = document.getElementById('popup');
        if (popup) {
            popup.innerHTML = "Sending your request to someone who can help..."
        }
        $( "#popup" ).dialog( "open" );
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
    }
    public render() {
        return <div className="centered">
            <form>
                <div className="row">
                    <div className="col-md-10">
                    <h2>Order a new PC</h2>
                    <h4 className="form-h4">fill out all fields and submit</h4>

                    <div className="form-group">    
                        <div className="col-md-12">
                            <input name="CustomerName" className="form-control" placeholder="Name" required></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <input label="CustomerEmail" name="CustomerEmail" className="form-control" placeholder="Email" required></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <input label="Department" name="Department" className="form-control" placeholder="Department"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="SupervisorEmail" className="form-control" placeholder="Supervisor's email"></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <select name="MachineType" className="selectpicker form-control" data-style="btn-info" title="Machine type">
                                <option>Desktop</option>
                                <option>Laptop</option>
                                <option>PC</option>
                                <option>Zero client</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <select name="OrderType" className="selectpicker form-control" data-style="btn-info" title="Order type">
                                <option>New</option>
                                <option>Replacement</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="OTRSTicket" className="form-control" placeholder="OTRS Ticket #"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12">
                            <input name="SoftwareApplications" className="form-control" placeholder="Software applications"></input>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-md-12">
                            <textarea name="Accessories" className="form-control" placeholder="Accessories"></textarea>
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

            <div id="overlay"></div>

        </div>;
    }
}