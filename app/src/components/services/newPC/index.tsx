import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ApplicationState } from '../../../store'
import * as Liaisons from '../../../store/liaisons'
import AccessControl from '../../accessControl'
import * as types from '../../../store/types'
import * as Messages from '../../../store/messages'
import * as User from '../../../store/user'
import * as Selects from './selects'
import Modal from 'react-responsive-modal'
import StandardAccessories from './markup/standardAccessories'
import StandardSoftware from './markup/standardSoftware'
import post from './post'
import Header from '../shared/header'
import UserInfo from './markup/userInfo'
import EmployeeInfo from './markup/employeeInfo'
import PCInfo from './markup/pcInfo'
import SubmitButton from '../shared/submitButton'
import AdditionalInformation from './markup/additionalInfo'
import * as moment from 'moment'

type props = {
    user: types.user
    liaisons: types.liaison[]
    successMessage: () => void
    errorMessage: () => void
    loadLiaisons: () => void
}

export class NewPC extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            customerPhone: '',
            machineType: '',
            department: '',
            userName: '',
            userNetworkID: '',
            building: '',
            floor: '',
            employmentStatus: '',
            employmentType: '',
            employeeeStartDate: '',
            previouslyFunctioning: '',
            computerNumber: '',
            computerFunctioning: '',
            OTRSticket: '',
            accessories: [],
            softwareApplications: '',
            ccCheck: '',
            cc: '',
            cellularData: '',
            cellularDataJustification: '',
            aditionalInformation: '',
            availableAccessories: [],
            modalIsOpen: false,
            accessoriesTooltip: false,
            softwareTooltip: false,
            redirect: false
        }
        this.setAccessories = this.setAccessories.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps, prevState) {
        // set accessories when machine type or department changes
        // then pass to addSpeakers to check for police
        if (prevState.machineType != this.state.machineType || prevState.department != this.state.department) {
            this.setAccessories()
        }

        // if docking station is selected for laptop
        // automatically add all laptop accessories
        if (!prevState.accessories.some(e => e.value === 'Docking Station') && this.state.accessories.some(e => e.value === 'Docking Station')) {
            this.setState({ accessories: Selects.LaptopAccessories })
        }
    }

    setAccessories() {
        this.setState({ accessories: [] }, () => {
            // sets accessory drop down based on machine type
            if (this.state.machineType.value === "Desktop") {
                this.setState({ availableAccessories: Selects.DesktopAccessories }, () => this.addSpeakers())
            }
            if (this.state.machineType.value === "Laptop") {
                this.setState({ availableAccessories: Selects.LaptopAccessories }, () => this.addSpeakers())
            }
            if (this.state.machineType.value === "Laptop/Tablet Combo") {
                this.setState({ availableAccessories: Selects.LaptopAccessories }, () => this.addSpeakers())
            }
            if (this.state.machineType.value === "Tablet") {
                this.setState({ availableAccessories: Selects.LaptopAccessories }, () => this.addSpeakers())
            }
            if (this.state.machineType.value === "Zero client" || this.state.machineType === "Thin client") {
                this.setState({ availableAccessories: Selects.ZeroClientAccessories }, () => this.addSpeakers())
            }
        })
    }

    addSpeakers() {
        // adds speakers by default to all Police orders for PCs
        if (this.state.department.value === "Police" && this.state.machineType.value === "Desktop") {
            var join = this.state.availableAccessories.concat(Selects.PoliceAccessories)
            this.setState({ availableAccessories: join, accessories: Selects.PoliceAccessories })
        }
    }

    async submit() {
        let load = {
            customerPhone: this.state.customerPhone,
            machineType: this.state.machineType.value,
            department: this.state.department.value,
            userName: this.state.userName,
            userNetworkID: this.state.userNetworkID,
            building: this.state.building,
            floor: this.state.floor,
            employmentStatus: this.state.employmentStatus.value || '',
            employmentType: this.state.employmentType.value || '',
            employeeStartDate: moment(this.state.employeeStartDate).format('MM/DD/YYYY') || '',
            previouslyFunctioning: this.state.previouslyFunctioning.value || '',
            computerNumber: this.state.computerNumber,
            computerFunctioning: this.state.computerFunctioning.value || '',
            OTRSticket: this.state.OTRSticket,
            accessories: this.state.accessories.map(accessory => accessory['value']).toString().replace(/,/g, ', '),
            softwareApplications: this.state.softwareApplications,
            cc: this.state.cc,
            cellularData: this.state.cellularData.value || '',
            cellularDataJustification: this.state.cellularDataJustification,
            additionalInformation: this.state.additionalInformation
        }
        // communicate success/failure
        let success = true
        success = await post(load, this.props.user)
        if (success == true) {
            this.props.successMessage()
        } else {
            this.props.errorMessage()
        }
        // send 'em on home
        this.setState({ redirect: true })
    }

    accessoriesTooltip() {
        this.setState({
            modalIsOpen: true,
            accessoriesTooltip: true
        })
    }

    softwareTooltip() {
        this.setState({
            modalIsOpen: true,
            softwareTooltip: true
        })
    }

    closeTooltip() {
        this.setState({
            modalIsOpen: false,
            accessoriesTooltip: false,
            softwareTooltip: false,
        })
    }

    public render() {

        const valid =
            this.state.customerPhone != '' &&
            this.state.machineType != '' &&
            this.state.department != '' &&
            this.state.building != '' &&
            this.state.floor != '' &&
            this.state.employmentStatus != ''


        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }
        
        return <div className='col-md-12'>
            <AccessControl
                itemType='new PCs'
                user={this.props.user}
                liaisons={this.props.liaisons}
                loadLiaisons={this.props.loadLiaisons}
            />
            <Header
                mainText='Order a new PC'
                subText='Complete all fields and submit'
            />
            <UserInfo
                parentState={this.state}
                setState={this.setState.bind(this)}
            />
            <EmployeeInfo
                parentState={this.state}
                setState={this.setState.bind(this)}
            />
            <PCInfo
                parentState={this.state}
                setState={this.setState.bind(this)}
                accessoriesTooltip={this.accessoriesTooltip.bind(this)}
                softwareTooltip={this.softwareTooltip.bind(this)}
            />
            <AdditionalInformation
                parentState={this.state}
                setState={this.setState.bind(this)}
            />
            <SubmitButton
                isEnabled={valid}
                submit={this.submit.bind(this)}
            />
            <Modal
                open={this.state.modalIsOpen}
                onClose={this.closeTooltip.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                animationDuration={1000}
                center>
                {this.state.accessoriesTooltip === true &&
                    <StandardAccessories />
                }
                {this.state.softwareTooltip === true &&
                    <StandardSoftware />
                }
            </Modal>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.user,
        ...state.liaisons
    }),
    ({
        ...Messages.actionCreators,
        ...User.actionCreators,
        ...Liaisons.actionCreators
    })
)(NewPC as any)