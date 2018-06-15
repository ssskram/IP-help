import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as MessagesStore from '../../../store/messages';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import Input from '../FormElements/input';
import Select from 'react-select';

type AllProps =
    MessagesStore.MessageState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{}>;

export class MobileDevice extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            DeviceType: '',
            NewReplacement: '',
            JobTitle: '',
            JobDuties: '',
            ReplacementExplanation: '',
            clearable: false,
            redirect: false
        }
    }

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

        // check to see if user is a dept liaison
        fetch('/api/userdata/equipment_check', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    // throw modal with 404 notice
                }
            });

    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({ Body: self.state.Body })
        this.setState({ Body: '' })
        fetch('/api/Forms/MobileDevice', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        this.props.success()
        this.setState({ redirect: true })
    }

    public render() {
        const { JobTitle, DeviceType, NewReplacement, JobDuties, ReplacementExplanation, clearable, redirect } = this.state
        const isEnabled =
            JobTitle != '' &&
            DeviceType != ''

        if (redirect) {
            return <Redirect to='/' />;
        }

        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Order a new mobile device</h2>
                    <h4 className="form-h">complete all fields and submit</h4>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <div className="form-group">
                    <div className="col-md-12 form-element">
                        <h4 className="form-h4">What type of device do you need?</h4>
                        <Select
                            name="DeviceType"
                            clearable={clearable}
                            value={DeviceType}
                            onChange={this.handleSelect.bind(this)}
                            options={[
                                { value: 'Yes', label: 'Yes' , name: 'DeviceType'},
                                { value: 'No', label: 'No', name: 'DeviceType' },
                            ]}
                        />
                    </div>
                </div>

                <Input
                    header="Please provide the employee's name & job title"
                    placeholder="Name & title"
                    name="JobTitle"
                    value={JobTitle}
                    callback={this.handleChildChange.bind(this)}
                />

                <div className="text-center">
                    <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(MobileDevice as any) as typeof MobileDevice;