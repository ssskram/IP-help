import * as React from "react";
import Spinner from "../../utilities/spinner";

type props = {
  submit: () => void;
  isEnabled: boolean;
};

type state = {
  spinner: boolean;
};

export default class SubmitTicket extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  submit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    this.props.submit();
  }

  public render() {
    return (
      <div className="col-md-12 text-center" style={{ marginBottom: "100px" }}>
        <h4>Please review all information before submitting.</h4>
        <button
          disabled={!this.props.isEnabled}
          onClick={this.submit.bind(this)}
          title={
            this.props.isEnabled ? null : "Please complete all required fields"
          }
          className="btn btn-success"
        >
          Submit
        </button>
        {this.state.spinner == true && (
          <Spinner notice="...submitting your request..." />
        )}
      </div>
    );
  }
}
