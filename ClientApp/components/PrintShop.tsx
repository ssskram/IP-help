import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class PrintShop extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
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
                url: '/api/Forms/PrintShop',
                type: 'POST',
                data: cleandata,
            }
        );
    }
    public render() {
        return <div className="centered">
        <form>
            <div className="row">
                <div className="col-md-10">
                <h2>Order something nice from the print shop</h2>
                </div>
            </div>
        </form>
    </div>;
    }
}