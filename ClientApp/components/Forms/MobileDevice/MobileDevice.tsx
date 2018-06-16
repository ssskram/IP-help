import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as MessagesStore from '../../../store/messages';
import * as LiaisonsStore from '../../../store/equipmentLiaisons';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import Input from '../FormElements/input';
import Select from '../FormElements/select';

const DeviceTypes = [
    { value: 'iPhone 6S', label: 'iPhone 6S', name: 'DeviceType' },
    { value: 'iPhone SE', label: 'iPhone SE', name: 'DeviceType' },
    { value: 'Samsung Galaxy J3 Eclipse', label: 'Samsung Galaxy J3 Eclipse', name: 'DeviceType' },
    { value: 'Samsung Galaxy S7', label: 'Samsung Galaxy S7', name: 'DeviceType' },
    { value: 'Kyocera Dura Force Pro Rugged', label: 'Kyocera Dura Force Pro Rugged', name: 'DeviceType' },
    { value: 'iPad Mini 7.9”', label: 'iPad Mini 7.9”', name: 'DeviceType' },
    { value: 'Samsung Galaxy Tab E 10”', label: 'Samsung Galaxy Tab E 10”', name: 'DeviceType' },
    { value: 'Samsung Galaxy Tab E 10”', label: 'Samsung Galaxy Tab E 10”', name: 'DeviceType' },
    { value: 'Flip phone', label: 'Flip phone', name: 'DeviceType' },
    { value: 'Jet pack', label: 'Jet pack', name: 'DeviceType' },
]

type Props =
    LiaisonsStore.equipmentLiaisonsState &
    MessagesStore.MessageState &
    typeof MessagesStore.actionCreators &
    typeof LiaisonsStore.actionCreators &
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
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.liaison == 0) {
            this.props.fourohfour()
            this.setState({ redirect: true })
        }

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
        const { JobTitle, DeviceType, NewReplacement, JobDuties, ReplacementExplanation, redirect } = this.state
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

                    <Select
                        name="DeviceType"
                        header='What type of device do you need?'
                        value={DeviceType}
                        onChange={this.handleSelect.bind(this)}
                        options={DeviceTypes}
                    />

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
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.messages, ...state.liaison }),
    ({ ...MessagesStore.actionCreators, ...LiaisonsStore.actionCreators })
)(MobileDevice as any) as typeof MobileDevice;