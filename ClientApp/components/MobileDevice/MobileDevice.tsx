import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as MessagesStore from '../../store/messages';
import * as LiaisonsStore from '../../store/equipmentLiaisons';
import * as Ping from '../../store/ping';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Input from '../FormElements/input';
import TextArea from '../FormElements/textarea';
import Select from '../FormElements/select';

const DeviceTypes = [
    { value: 'iPhone 7', label: 'iPhone 7', name: 'DeviceType' },
    { value: 'iPhone SE', label: 'iPhone SE', name: 'DeviceType' },
    { value: 'Samsung Galaxy 8', label: 'Samsung Galaxy 8', name: 'DeviceType' },
    { value: 'Kyocera DuraXV LTE (Flip phone)', label: 'Kyocera DuraXV LTE (Flip phone)', name: 'DeviceType' },
    { value: 'Kyocera Dura Force Pro Rugged', label: 'Kyocera Dura Force Pro Rugged', name: 'DeviceType' },
    { value: 'iPad Mini 7.9”', label: 'iPad Mini 7.9”', name: 'DeviceType' },
    { value: 'iPad 10.5”', label: 'iPad 10.5”', name: 'DeviceType' },
    { value: 'Samsung Galaxy Tab E 10”', label: 'Samsung Galaxy Tab E 10”', name: 'DeviceType' },
    { value: 'Jet pack', label: 'Jet pack', name: 'DeviceType' },
]

const NeworReplacement = [
    { value: 'New', label: 'New', name: 'NewReplacement' },
    { value: 'Replacement', label: 'Replacement', name: 'NewReplacement' },
]

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
        
        // check liaison status
        if (this.props.liaison == 0) {
            this.props.fourohfour()
            this.setState({ redirect: true })
        }

        // ping server
        this.props.ping()
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({
            JobTitle: self.state.JobTitle,
            DeviceType: self.state.DeviceType,
            NewReplacement: self.state.NewReplacement,
            JobDuties: self.state.JobDuties,
            ReplacementExplanation: self.state.ReplacementExplanation
        })
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
        // state
        const {
            JobTitle,
            DeviceType,
            NewReplacement,
            JobDuties,
            ReplacementExplanation,
            redirect } = this.state
        // validate
        const isEnabled =
            JobTitle != '' &&
            DeviceType != '' &&
            NewReplacement != '' &&
            (JobDuties != '' ||
            ReplacementExplanation != '')

        if (redirect) {
            return <Redirect to='/' />;
        }

        return <div className="centered">
            <div className="row text-center">
                <div className="col-md-12">
                    <h1>Order a new mobile device</h1>
                    <h4 className="form-h">complete all fields and submit</h4>
                `   <br/>
                </div>
            </div>
            <div className="col-md-12">
                <div className="col-md-6 col-md-offset-3 panel panel-body">
                    <Select
                        value={DeviceType}
                        name="DeviceType"
                        header='What type of device do you need?'
                        placeholder='Select device type'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={DeviceTypes}
                        required
                    />

                    <Select
                        value={NewReplacement}
                        name="NewReplacement"
                        header='Is this request for a new or replacement mobile device?'
                        placeholder='New or replacement'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={NeworReplacement}
                        required
                    />

                    <Input
                        value={JobTitle}
                        name="JobTitle"
                        header="Please provide the employee's name & job title"
                        placeholder="Name & title"
                        callback={this.handleChildChange.bind(this)}
                        required
                    />

                    {NewReplacement === 'New' &&
                        <TextArea
                            value={JobDuties}
                            name="JobDuties"
                            header="Please explain how it will be used in relation to the employee's job duties"
                            placeholder="Explanation"
                            callback={this.handleChildChange.bind(this)}
                            required
                        />
                    }
                    {NewReplacement === 'Replacement' &&
                        <TextArea
                            value={ReplacementExplanation}
                            name="ReplacementExplanation"
                            header="Please explain why the old device needs to be replaced"
                            placeholder="Explanation"
                            callback={this.handleChildChange.bind(this)}
                            required
                        />
                    }

                    <div className="text-center">
                        <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.liaison,
        ...state.ping
    }),
    ({
        ...MessagesStore.actionCreators,
        ...LiaisonsStore.actionCreators,
        ...Ping.actionCreators
    })
)(MobileDevice as any) as typeof MobileDevice;