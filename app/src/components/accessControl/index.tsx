import * as React from "react";
import * as types from "../../store/types";
import Modal from "react-responsive-modal";
import { Cat } from "react-kawaii";
import Select from "../formElements/select";
import Spinner from "../utilities/spinner";

type props = {
  itemType: string;
  user: types.user;
  liaisons: types.liaison[];
  loadLiaisons: () => void;
};

type state = {
  catMood: string;
  department: any;
  liaisons: types.liaison[];
};

export default class AccessDenied extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      catMood: "sad",
      department: undefined,
      liaisons: undefined
    };
  }

  componentDidMount() {
    this.props.loadLiaisons();
  }

  checkStatus(user, liaisons) {
    const liaison = liaisons.find(ls => ls.user == user.email.toLowerCase());
    if (liaison) return true;
    else return false;
  }

  throwLiaisons(department) {
    this.setState({
      department,
      catMood: "blissful",
      liaisons: this.props.liaisons.filter(
        l => l.department == department.value
      )
    });
  }

  dropdown() {
    let selects = [] as any;
    this.props.liaisons.forEach(i => {
      selects.push({ value: i.department, label: i.department });
    });
    selects.sort((a, b) => a.label.localeCompare(b.label));
    return Array.from(
      selects.reduce((m, t) => m.set(t.value, t), new Map()).values()
    );
  }

  render() {
    if (this.props.liaisons.length > 0 && this.props.user.email) {
      const isLiaison = this.checkStatus(this.props.user, this.props.liaisons);
      if (!isLiaison) {
        return (
          <div>
            <Modal
              open={true}
              onClose={() => {}}
              classNames={{
                overlay: "custom-overlay",
                modal: "custom-modal"
              }}
              showCloseIcon={false}
              center
            >
              <div className="text-center">
                <br />
                <Cat size={220} mood={this.state.catMood} color="#596881" />
                <h3 className="oswald-header">Sorry,</h3>
                <h4 style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Only I&P liaisons can order {this.props.itemType}.
                </h4>
                <Select
                  value={this.state.department}
                  header="To view liaison(s), select your department"
                  placeholder="Select department"
                  onChange={department => this.throwLiaisons(department)}
                  multi={false}
                  options={this.dropdown()}
                />
                {this.state.liaisons && (
                  <div
                    style={{
                      marginBottom: "10px",
                      textAlign: "left",
                      padding: "0px 15px"
                    }}
                  >
                    <div>
                      <u>Liaisons:</u>
                    </div>
                    {this.state.liaisons.map((l, key) => {
                      return <h5 key={key}>{l.user}</h5>;
                    })}
                  </div>
                )}
              </div>
            </Modal>
          </div>
        );
      } else return null;
    } else {
      return (
        <div>
          <Spinner notice="...loading your account..." />
        </div>
      );
    }
  }
}
