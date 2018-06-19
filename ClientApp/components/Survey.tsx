import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as MessagesStore from '../store/messages';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import TextArea from './Forms/FormElements/textarea';
import Select from './Forms/FormElements/select';
import Input from './Forms/FormElements/input';

const Options = [
    { value: 'Yes', label: 'Yes', name: 'futureUserTesting' },
    { value: 'No', label: 'No', name: 'futureUserTesting' },
]

export class Survey extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            name: '',
            department: '',
            body: '',
            futureUserTesting: '',
            clearable: false,
            redirect: false
        }
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
        let data = JSON.stringify({ name: self.state.name, department: self.state.department, body: self.state.body, futureUserTesting: self.state.futureUserTesting })
        self.setState({ body: '' })
        fetch('/api/survey/post', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        this.props.surveySubmitted()
        this.setState({ redirect: true })
    }

    public render() {
        const { name, department, body, futureUserTesting, clearable, redirect } = this.state
        const isEnabled =
            name.length > 0 &&
            department.length > 0 &&
            body.length > 0 &&
            futureUserTesting.length > 0;

        if (redirect) {
            return <Redirect to='/' />;
        }

        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Thanks for your time</h2>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <div className="form-group">

                    <Input
                        header="Name"
                        placeholder="Enter your name"
                        name="name"
                        value={name}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Input
                        header="Department"
                        placeholder="Enter your department"
                        name="department"
                        value={department}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <TextArea
                        header="Comments"
                        placeholder="Thoughts, suggestions, etc."
                        name="body"
                        value={body}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Select
                        value={futureUserTesting}
                        name="futureUserTesting"
                        header='Would you be willing to participate in user testing for other applications?'
                        placeholder='Yes or no'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={Options}
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
    (state: ApplicationState) =>
        state.messages,
        MessagesStore.actionCreators
)(Survey as any) as typeof Survey;
