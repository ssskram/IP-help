import * as React from "react";
import { Redirect } from "react-router-dom";
import Input from "../../formElements/input";
import Select from "../../formElements/select";
import Phone from "../../formElements/phone";
import * as MessagesStore from "../../../store/messages";
import * as User from "../../../store/user";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import * as types from "../../../store/types";
import Post from "./post";
import SubmitButton from "../shared/submitButton";
import Header from "../shared/header";
import * as SharedSelects from "../shared/selects";

type props = {
  user: types.user;
  successMessage: () => void;
  errorMessage: () => void;
};

type state = {
  redirect: boolean;
  existingNumber: string;
  userName: string;
  intercomNumber: string;
  voicemail: string;
  phoneTrees: string;
  department: string;
  location: string;
};

export class MobileDevice extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      existingNumber: "",
      userName: "",
      intercomNumber: "",
      voicemail: "",
      phoneTrees: "",
      department: "",
      location: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async submit() {
    // data to post
    let load = {
      existingNumber: this.state.existingNumber,
      userName: this.state.userName,
      intercomNumber: this.state.intercomNumber,
      voicemail: this.state.voicemail,
      phoneTrees: this.state.phoneTrees,
      department: this.state.department,
      location: this.state.location
    };
    // communicate success/failure
    let success = true;
    success = await Post(load, this.props.user);
    if (success == true) {
      this.props.successMessage();
    } else {
      this.props.errorMessage();
    }
    // send 'em on home
    this.setState({ redirect: true });
  }

  public render() {
    const {
      redirect,
      existingNumber,
      userName,
      intercomNumber,
      voicemail,
      phoneTrees,
      department,
      location
    } = this.state;

    const valid =
      existingNumber != "" &&
      userName != "" &&
      voicemail != "" &&
      phoneTrees != "" &&
      department != "" &&
      location != "";

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="centered">
        <Header
          mainText="Order a new desk phone"
          subText="Complete all fields and submit"
        />
        <div className="col-md-4 col-md-offset-4 panel">
          <div className="sectionHeader">
            Desk phone
            <span className="glyphicon glyphicon-phone-alt pull-right" />
          </div>
          <div className="panel-body">
            <Input
              value={userName}
              header="What is the employee's name?"
              placeholder="Employee name"
              callback={e => this.setState({ userName: e.target.value })}
              required
            />
            <Select
              value={department}
              header="What is the employee's department?"
              placeholder="Select department"
              onChange={department => this.setState({ department })}
              multi={false}
              options={SharedSelects.Departments}
              required
            />
            <Input
              value={location}
              header="Where is the employee located?"
              placeholder="Building, floor, room, etc."
              callback={e => this.setState({ location: e.target.value })}
              required
            />
            <Phone
              value={existingNumber}
              header="Existing or vacant phone number to assign"
              placeholder="Phone number"
              callback={e => this.setState({ existingNumber: e })}
              required
            />
            <Input
              value={intercomNumber}
              header="Vacant intercom number, if available"
              placeholder="Intercom number"
              callback={e => this.setState({ intercomNumber: e.target.value })}
            />
            <Select
              value={voicemail}
              header="Will the line need voicemail?"
              placeholder="Yes or no"
              onChange={voicemail => this.setState({ voicemail })}
              multi={false}
              options={SharedSelects.YesNo}
              required
            />
            <Select
              value={phoneTrees}
              header="Will the intecom be assigned to any phone trees?"
              placeholder="Yes or no"
              onChange={phoneTrees => this.setState({ phoneTrees })}
              multi={false}
              options={SharedSelects.YesNo}
              required
            />
          </div>
        </div>
        <SubmitButton isEnabled={valid} submit={this.submit.bind(this)} />
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.messages,
    ...state.user
  }),
  {
    ...MessagesStore.actionCreators,
    ...User.actionCreators
  }
)(MobileDevice as any);
