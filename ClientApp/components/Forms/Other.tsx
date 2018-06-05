import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class Other extends React.Component<RouteComponentProps<{}>, {}> {
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

        // form validation
        $("form").validate({
            messages: {
                Body: 'This field is required'
            }
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
                    url: '/api/Forms/Other',
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
        }
    }
    autoexpand() {
        var heightLimit = 300;
        var jt = document.getElementById("Body");
        if (jt) {
            jt.style.height = "";
            jt.style.height = Math.min(jt.scrollHeight, heightLimit) + "px";
        }
    }
    public render() {
        return <div className="centered">
            <form>
                <div className="row">
                    <div className="col-md-10">
                        <h2>Miscellaneous request</h2>
                        <hr />

                        <div className="form-group">
                            <div className="col-md-12 form-element">
                                <h4 className="form-h4">Describe your request</h4>
                                <label htmlFor="Body" className="error" hidden></label>
                                <textarea name="Body" id="Body" className="form-control" rows={4} placeholder="What can we help you with?" onChange={this.autoexpand} required></textarea>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 text-center">
                        <a type="button" id="submit" title="Submit request" value="Submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</a>
                    </div>
                </div>
            </form>
        </div>;
    }
}