import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as MessagesStore from '../../../store/messages';
import * as Ping from '../../../store/ping';
import * as LiaisonsStore from '../../../store/equipmentLiaisons';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import Input from '../FormElements/input';
import TextArea from '../FormElements/textarea';
import Select from '../FormElements/select';
import Modal from 'react-modal';
import StandardAccessories from './StandardAccessories';
import StandardSoftware from './StandardSoftware'

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fffcf5',
        border: 'solid 1px rgba(160, 160, 160, 0.3)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
        overflow: 'visible',
        maxWidth: '1300px',
        maxHeight: '100vh',
        overflowY: 'auto'
    }
};

const MachineTypes = [
    { value: 'Desktop', label: 'Desktop', name: 'MachineType' },
    { value: 'Laptop', label: 'Laptop', name: 'MachineType' },
    { value: 'Zero client', label: 'Zero client', name: 'MachineType' },
]

const Departments = [
    { value: 'Animal Control', label: 'Animal Control', name: 'Department' },
    { value: 'Bureau of Neighborhood Empowerment', label: 'Bureau of Neighborhood Empowerment', name: 'Department' },
    { value: 'Citiparks', label: 'Citiparks', name: 'Department' },
    { value: 'Citizen’s Police Review Board', label: 'Citizen’s Police Review Board', name: 'Department' },
    { value: 'City Clerk', label: 'City Clerk', name: 'Department' },
    { value: 'City Controller', label: 'City Controller', name: 'Department' },
    { value: 'City Council', label: 'City Council', name: 'Department' },
    { value: 'City Planning', label: 'City Planning', name: 'Department' },
    { value: 'Commission on HR', label: 'Commission on HR', name: 'Department' },
    { value: 'Community Affairs', label: 'Community Affairs', name: 'Department' },
    { value: 'DOMI', label: 'DOMI', name: 'Department' },
    { value: 'EMA', label: 'EMA', name: 'Department' },
    { value: 'EMS', label: 'EMS', name: 'Department' },
    { value: 'EORC', label: 'EORC', name: 'Department' },
    { value: 'Ethics Hearing Board', label: 'Ethics Hearing Board', name: 'Department' },
    { value: 'Finance', label: 'Finance', name: 'Department' },
    { value: 'Fire', label: 'Fire', name: 'Department' },
    { value: 'HR & Civil Service', label: 'HR & Civil Service', name: 'Department' },
    { value: 'Innovation & Performance', label: 'Innovation & Performance', name: 'Department' },
    { value: 'Law', label: 'Law', name: 'Department' },
    { value: "Mayor's Office", label: "Mayor's Office", name: 'Department' },
    { value: 'OMB', label: 'OMB', name: 'Department' },
    { value: 'OMI', label: 'OMI', name: 'Department' },
    { value: 'Pension', label: 'Pension', name: 'Department' },
    { value: 'Pittsburgh Partnership', label: 'Pittsburgh Partnership', name: 'Department' },
    { value: 'PLI', label: 'PLI', name: 'Department' },
    { value: 'Police', label: 'Police', name: 'Department' },
    { value: 'Public Safety', label: 'Public Safety', name: 'Department' },
    { value: 'Public Works', label: 'Public Works', name: 'Department' },
]

const EmploymentStatuses = [
    { value: 'New', label: 'New', name: 'EmploymentStatus' },
    { value: 'Existing', label: 'Existing', name: 'EmploymentStatus' },
]

const DesktopAccessories = [
    { value: 'Keyboard', label: 'Keyboard', name: 'Accessories' },
    { value: 'Mouse', label: 'Mouse', name: 'Accessories' },
    { value: 'Single Monitor', label: 'Single Monitor', name: 'Accessories' },
    { value: 'Dual Monitors', label: 'Dual Monitors', name: 'Accessories' },
]

const LaptopAccessories = [
    { value: 'Docking Station', label: 'Docking Station', name: 'Accessories' },
    { value: 'Keyboard', label: 'Keyboard', name: 'Accessories' },
    { value: 'Mouse', label: 'Mouse', name: 'Accessories' },
    { value: 'Additional Monitor', label: 'Additional Monitor', name: 'Accessories' },
]

const ZeroClientAccessories = [
    { value: 'Keyboard', label: 'Keyboard', name: 'Accessories' },
    { value: 'Mouse', label: 'Mouse', name: 'Accessories' },
]

const PoliceAccessories = [
    { value: 'Speakers', label: 'Speakers', name: 'Accessories' },
]

const EmploymentTypes = [
    { value: 'Permanent', label: 'Permanent', name: 'EmploymentType' },
    { value: 'Intern', label: 'Intern', name: 'EmploymentType' },
]

const WasPreviouslyFunctioning = [
    { value: 'Yes', label: 'Yes', name: 'PreviouslyFunctioning' },
    { value: 'No', label: 'No', name: 'PreviouslyFunctioning' },
]

const IsComputerFunctioning = [
    { value: 'Yes', label: 'Yes', name: 'ComputerFunctioning' },
    { value: 'No', label: 'No', name: 'ComputerFunctioning' },
]

Modal.setAppElement('#main');

export class PCOrder extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            CustomerPhone: '',
            MachineType: '',
            Department: '',
            UserName: '',
            UserNetworkID: '',
            Building: '',
            Floor: '',
            EmploymentStatus: '',
            EmploymentType: '',
            PreviouslyFunctioning: '',
            ComputerNumber: '',
            ComputerFunctioning: '',
            OTRSTicket: '',
            Accessories: '',
            SoftwareApplications: '',
            AvailableAccessories: [],
            modalIsOpen: false,
            accessoriesTrigger: false,
            softwareTrigger: false,
            redirect: false
        }
    }

    componentDidMount() {
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

    handleMultiSelect(value) {
        this.setState({ Accessories: value });
        if (value === "Docking Station") {
            this.setState({ Accessories: LaptopAccessories });
        }
    };

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({
            CustomerPhone: self.state.CustomerPhone,
            MachineType: self.state.MachineType,
            Department: self.state.Department,
            UserName: self.state.UserName,
            UserNetworkID: self.state.UserNetworkID,
            Building: self.state.Building,
            Floor: self.state.Floor,
            EmploymentStatus: self.state.EmploymentStatus,
            EmploymentType: self.state.EmploymentType,
            PreviouslyFunctioning: self.state.PreviouslyFunctioning,
            ComputerNumber: self.state.ComputerNumber,
            ComputerFunctioning: self.state.ComputerFunctioning,
            OTRSTicket: self.state.OTRSTicket,
            Accessories: self.state.Accessories,
            SoftwareApplications: self.state.SoftwareApplications,
        })
        this.setState({ Body: '' })
        fetch('/api/Forms/PCOrder', {
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

    setAccessories(event) {
        if (event.value === "Desktop") {
            this.setState({ AvailableAccessories: DesktopAccessories });
        }
        if (event.value === "Laptop") {
            this.setState({ AvailableAccessories: LaptopAccessories });
        }
        if (event.value === "Zero client") {
            this.setState({ AvailableAccessories: ZeroClientAccessories });
        }
        this.setState({ [event.name]: event.value });
    }

    addSpeakers(event) {
        if (event.value === "Police" || event.value === "Public Safety") {
            var join = this.state.AvailableAccessories.concat(PoliceAccessories);
            this.setState({ AvailableAccessories: join })
        }
        else {
            var newArray = [...this.state.AvailableAccessories]
            var index = newArray.indexOf(PoliceAccessories)
            newArray.splice(index, 1)
            this.setState({ AvailableAccessories: newArray })
        }
        this.setState({ [event.name]: event.value });
    }

    accessoriesTooltip() {
        this.setState({
            modalIsOpen: true,
            accessoriesTrigger: true
        });
    }

    softwareTooltip() {
        this.setState({
            modalIsOpen: true,
            softwareTrigger: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            accessoriesTrigger: false,
            softwareTrigger: false,
        });
    }


    public render() {
        // state
        const {
            CustomerPhone,
            MachineType,
            Department,
            UserName,
            UserNetworkID,
            Building,
            Floor,
            EmploymentStatus,
            EmploymentType,
            PreviouslyFunctioning,
            ComputerNumber,
            ComputerFunctioning,
            OTRSTicket,
            Accessories,
            SoftwareApplications,
            AvailableAccessories,
            modalIsOpen,
            accessoriesTrigger,
            softwareTrigger,
            redirect } = this.state
        // validate
        const isEnabled =
            CustomerPhone != '' &&
            MachineType != '' &&
            Department != '' &&
            Building != '' &&
            Floor != '' &&
            EmploymentStatus != ''

        if (redirect) {
            return <Redirect to='/' />;
        }

        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Order a new PC</h2>
                    <h4 className="form-h">complete all fields and submit</h4>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <div className="form-group">

                    <Input
                        value={CustomerPhone}
                        name="CustomerPhone"
                        header="Enter your phone number"
                        placeholder="Phone number"
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Select
                        value={MachineType}
                        name="MachineType"
                        header='What type of machine are you requesting?'
                        placeholder='Select machine type'
                        onChange={this.setAccessories.bind(this)}
                        multi={false}
                        options={MachineTypes}
                    />

                    <Select
                        value={Department}
                        name="Department"
                        header='Which department will be receiving this machine?'
                        placeholder='Select department'
                        onChange={this.addSpeakers.bind(this)}
                        multi={false}
                        options={Departments}
                    />

                    <Input
                        value={UserName}
                        name="UserName"
                        header="Which employee will be receiving this machine?"
                        placeholder="Employee's Name"
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Input
                        value={UserNetworkID}
                        name="UserNetworkID"
                        header="What is the employee's network id?"
                        placeholder="Employee's network id"
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Input
                        header="What is the employee's building?"
                        placeholder="Building name"
                        name="Building"
                        value={Building}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Input
                        header="What is the employee's floor number"
                        placeholder="Floor number"
                        name="Floor"
                        value={Floor}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <Select
                        value={EmploymentStatus}
                        name="EmploymentStatus"
                        header='Is this for a new employee, or an existing staff member?'
                        placeholder='New or existing employee'
                        onChange={this.handleChildSelect.bind(this)}
                        multi={false}
                        options={EmploymentStatuses}
                    />

                    {/* conditional fields start */}
                    {EmploymentStatus === 'New' &&
                        <Select
                            value={EmploymentType}
                            name="EmploymentType"
                            header='Is this for a permanent employee, or intern?'
                            placeholder='Permanent employee or intern'
                            onChange={this.handleChildSelect.bind(this)}
                            multi={false}
                            options={EmploymentTypes}
                        />
                    }
                    {EmploymentStatus === 'New' &&
                        <Select
                            value={PreviouslyFunctioning}
                            name="PreviouslyFunctioning"
                            header='Was a functioning computer plugged into the desk network port in the previous month?'
                            placeholder='Yes or no'
                            onChange={this.handleChildSelect.bind(this)}
                            multi={false}
                            options={WasPreviouslyFunctioning}
                        />
                    }
                    {EmploymentStatus === 'Existing' &&
                        <Input
                            header="Enter their current computer number"
                            placeholder="Computer number"
                            name="ComputerNumber"
                            value={ComputerNumber}
                            callback={this.handleChildChange.bind(this)}
                        />
                    }
                    {EmploymentStatus === 'Existing' &&
                        <Select
                            value={ComputerFunctioning}
                            name="ComputerFunctioning"
                            header='Is their current computer functioning?'
                            placeholder='Yes or no'
                            onChange={this.handleChildSelect.bind(this)}
                            options={IsComputerFunctioning}
                        />
                    }
                    {EmploymentStatus === 'Existing' &&
                        <Input
                            header="Please enter the OTRS ticket number associated with the replacement"
                            placeholder="OTRS ticket number"
                            name="OTRSTicket"
                            value={OTRSTicket}
                            callback={this.handleChildChange.bind(this)}
                        />
                    }
                    {/* conditional fields end*/}

                    <div className='tooltip-container'>
                        <a onClick={this.accessoriesTooltip.bind(this)}>View standard accessories</a>
                    </div>
                    <Select
                        value={Accessories}
                        name="Accessories"
                        header='Select any necessary accessories'
                        placeholder='Accessories...'
                        onChange={this.handleMultiSelect.bind(this)}
                        multi={true}
                        options={AvailableAccessories}
                    />

                    <div className='tooltip-container'>
                        <a onClick={this.softwareTooltip.bind(this)}>View standard software applications</a>
                    </div>
                    <TextArea
                        header="Identify any non-standard software applications you would like"
                        placeholder="Dept. may be responsible for payment of licensed software"
                        name="SoftwareApplications"
                        value={SoftwareApplications}
                        callback={this.handleChildChange.bind(this)}
                    />

                    <div className="text-center">
                        <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                    </div>

                    <Modal isOpen={modalIsOpen} style={modalStyles}>
                        {accessoriesTrigger === true &&
                            <StandardAccessories exit={this.closeModal.bind(this)} />
                        }
                        {softwareTrigger === true &&
                            <StandardSoftware exit={this.closeModal.bind(this)} />
                        }
                    </Modal>
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
)(PCOrder as any) as typeof PCOrder;