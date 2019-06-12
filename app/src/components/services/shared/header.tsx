import * as React from "react";

type props = {
  mainText: string;
  subText?: string;
};
export default class Header extends React.Component<props, any> {
  public render() {
    return (
      <div className="row text-center">
        <div className="col-md-12">
          <h1>{this.props.mainText}</h1>
          <h4>{this.props.subText}</h4>
          <br />
        </div>
      </div>
    );
  }
}
