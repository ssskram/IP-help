import * as React from "react";
import TextArea from "../../../formElements/textarea";

export default class AdditionalInformation extends React.Component<any, any> {
  public render() {
    const { additionalInformation } = this.props.parentState;

    const { setState } = this.props;

    return (
      <div className="col-md-4 col-md-offset-4 panel">
        <div className="sectionHeader">Additional information</div>
        <div className="panel-body">
          <TextArea
            value={additionalInformation}
            header="Is there anything else we need to know?"
            placeholder="Additional information"
            callback={e => setState({ additionalInformation: e.target.value })}
          />
        </div>
      </div>
    );
  }
}
