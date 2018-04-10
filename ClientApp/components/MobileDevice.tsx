import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class MobileDevice extends React.Component<RouteComponentProps<{}>, {}> {
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
                url: '/api/Forms/MobileDevice',
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
                <h2>Order a mobile device</h2>
                <h4 className="form-h4">fill out all fields and submit</h4>
                <hr/>
                
                <div className="form-group">
                    <div className="col-md-12 form-element">
                        <h4 className="form-h4">What type of device do you need?</h4>
                        <select name="DeviceType" className="selectpicker btn-form-control" data-style="btn-info" title="Select device">
                            <option value="iPhone 6S" title="iPhone 6S" data-subtext="6S">iPhone</option>
                            <option value="iPhone 6E" title="iPhone 6E" data-subtext="6E">iPhone</option>
                            <option value="Samsung Galaxy J3 Eclipse" title="Samsung Galaxy J3 Eclipse" data-subtext="Samsung Galaxy J3 Eclipse">Android</option>
                            <option value="Samsung Galaxy S7" title="Samsung Galaxy S7" data-subtext="Samsung Galaxy S7">Android</option>
                            <option value="Kyocera Dura Force Pro Rugged" title="Kyocera Dura Force Pro Rugged" data-subtext="Kyocera Dura Force Pro Rugged">Android</option>
                            <option value="iPad Mini 7.9”" title="iPad Mini 7.9”" data-subtext="iPad Mini 7.9”">Tablet</option>
                            <option value="iPad 10.5" title="iPad 10.5" data-subtext="iPad 10.5">Tablet</option>
                            <option value="Samsung Galaxy Tab E 10”" title="Samsung Galaxy Tab E 10”" data-subtext="Samsung Galaxy Tab E 10”">Tablet</option>
                            <option>Flip phone</option>
                            <option>Jet pack</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-12 form-element">
                        <h4 className="form-h4">Is this request for a new staff member, or for a replacement mobile device?</h4>
                        <select name="NewReplacement" data-style="btn-info" className="btn-form-control selectpicker" title="New or replacement">
                            <option>New</option>
                            <option>Replacement</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-md-12 form-element">
                        <h4 className="form-h4">Please provide the employee's job title and description</h4>
                        <textarea name="JobTitle" className="form-control" placeholder="Job title and description"></textarea>
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