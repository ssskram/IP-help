import * as React from "react";
import Phone from "../../../formElements/phone";
import Select from "../../../formElements/select";
import Input from "../../../formElements/input";
import * as Selects from "../../shared/selects";

export default class UserInfo extends React.Component<any, any> {
  public render() {
    const { customerPhone, ccCheck, cc } = this.props.parentState;

    const { setState } = this.props;

    return (
      <div className="col-md-4 col-md-offset-4 panel">
        <div className="sectionHeader">
          Your information
          <span className="glyphicon glyphicon-info-sign pull-right" />
        </div>
        <div className="panel-body">
          <Phone
            value={customerPhone}
            header="Enter your phone number"
            placeholder="Phone number"
            callback={number => setState({ customerPhone: number })}
            required
          />

          <Select
            value={ccCheck}
            header="Do you need to copy anyone on this order?"
            placeholder="Yes or no"
            onChange={ccCheck => setState({ ccCheck })}
            multi={false}
            options={Selects.YesNo}
            required
          />

          {ccCheck.value == "Yes" && (
            <div className="col-md-12">
              <Input
                value={cc}
                header="Enter an email address"
                placeholder="Email address for CC"
                callback={e => setState({ cc: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
