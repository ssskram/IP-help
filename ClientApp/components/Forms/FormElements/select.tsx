import * as React from 'react';
import Select from 'react-select';

export default class input extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            clearable: false,
            autoFocus: false
        }
    }
    public render() {
        
        return (
            <div className="form-group">
                <div className="col-md-12 form-element">
                    <h4 className="form-h4">{this.props.header}</h4>
                    <Select
                        autoFocus={this.state.autoFocus}
                        name={this.props.name}
                        clearable={this.state.clearable}
                        value={this.props.value}
                        onChange={this.props.onChange.bind(this)}
                        options={this.props.options}
                    />
                </div>
            </div>
        )
    }
}
