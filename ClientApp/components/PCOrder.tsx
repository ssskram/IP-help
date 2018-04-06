import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class PCOrder extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
        $('.datepicker').datepicker({
            format: "mm/dd/yyyy"
        });  
        $('.selectpicker').selectpicker();
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
        }
        $( "#success" ).dialog({
            width: 350,
            height: 200,
            modal: true,
            autoOpen: false,
            close: function () {
                var body = document.getElementById('success');
                if (body) {
                    body.innerHTML = "Sending your request to someone who can help..."
                  }
            }
        });
    }
    handleSubmit() {
        var data = $('form').serialize(); 
        var cleandata = data.replace(/\'/g, '');
        $.ajax(
            {
                url: '/api/Forms/PCOrder',
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
                    <h2>Order a new PC</h2>
                    <h4>fill out all fields and submit</h4>

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

            <div id="success">
            Sending your request to someone who can help...
            </div>
        </div>;
    }
}