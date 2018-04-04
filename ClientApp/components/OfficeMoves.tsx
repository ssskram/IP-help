import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class OfficeMoves extends React.Component<RouteComponentProps<{}>, {}> {
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
                url: '/api/Forms/OfficeMoves',
                type: 'POST',
                data: cleandata,
            }
        );
    }
    public render() {
        return <div className="centered">
        <form>
            <div className="row">
                <div className="col-md-12">
                <h3>Office move form</h3>
                </div>
            </div>
        </form>
    </div>;
    }
}