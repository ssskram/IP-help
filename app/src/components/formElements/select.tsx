import * as React from 'react'
import Select from 'react-select'
import { Helmet } from "react-helmet"

const dropdownStyle = '.custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible }'

type state = {
    dropdownOpen: boolean
}

export default class SelectElement extends React.Component<any, state> {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }
    }

    public render() {
        return (
            <div className="form-group">
                {this.state.dropdownOpen == true &&
                    <Helmet>
                        <style>{dropdownStyle}</style>
                    </Helmet>
                }
                <div className="col-md-12 form-element">
                    <h5 className="form-h4">{this.props.header}{this.props.required == true && <span style={{ color: 'red', fontSize: '20' }}>*</span>}</h5>
                    <Select
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        options={this.props.options}
                        closeOnSelect={!this.props.multi}
                        simpleValue={this.props.multi}
                        removeSelected={this.props.multi}
                        isMulti={this.props.multi}
                        clearable={this.props.multi}
                        onMenuOpen={() => this.setState({ dropdownOpen: true })}
                        onMenuClose={() => this.setState({ dropdownOpen: false })}
                    />
                </div>
            </div>
        )
    }
}
