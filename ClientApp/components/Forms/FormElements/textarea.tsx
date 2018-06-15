import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class textarea extends React.Component<any, any> {

    autoexpand() {
        var heightLimit = 300;
        var jt = document.getElementById("Body");
        if (jt) {
            jt.style.height = "";
            jt.style.height = Math.min(jt.scrollHeight, heightLimit) + "px";
        }
    }

    public render() {
        return (
        <div className="form-group">
            <div className="col-md-12 form-element">
                <h4 className="form-h4">{this.props.header}</h4>
                <textarea className="form-control" name={this.props.name} id={this.props.name}  placeholder={this.props.placeholder} rows={4} onChange={this.autoexpand}></textarea>
            </div>
        </div>
        )
    }
}
