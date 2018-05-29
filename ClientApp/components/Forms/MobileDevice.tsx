import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class MobileDevice extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
        // date fields & select elements
        $('.datepicker').datepicker({
            format: "mm/dd/yyyy"
        });  
        $('.selectpicker').selectpicker();
        // form validation
        $("form").validate({
            messages: {
                DeviceType: 'This field is required',
                NewReplacement: 'This field is required',
                JobTitle: 'This field is required'
            }
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
                    url: '/api/Forms/MobileDevice',
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
    autoexpand () {
        var heightLimit = 300;
        var jt = document.getElementById("JobTitle");
        if (jt)
        {
            jt.style.height = "";
            jt.style.height = Math.min(jt.scrollHeight, heightLimit) + "px";
        }
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
                        <label htmlFor="DeviceType" className="error" hidden></label>
                        <select id="DeviceType" name="DeviceType" className="selectpicker btn-form-control" data-style="btn-info" title="Select device" required>
                            <option value="iPhone 6S" title="iPhone 6S" data-subtext="6S">iPhone</option>
                            <option value="iPhone SE" title="iPhone SE" data-subtext="SE">iPhone</option>
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
                        <label htmlFor="NewReplacement" className="error" hidden></label>
                        <select name="NewReplacement" id="NewReplacement" data-style="btn-info" className="btn-form-control selectpicker" title="New or replacement" required>
                            <option>New</option>
                            <option>Replacement</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-md-12 form-element">
                        <h4 className="form-h4">Please provide the employee's job title and description</h4>
                        <label htmlFor="JobTitle" className="error" hidden></label>
                        <textarea name="JobTitle" id="JobTitle" className="form-control" placeholder="Job title and description" onChange={this.autoexpand} required></textarea>
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
    </div>;
    }
}