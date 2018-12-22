import * as React from 'react'
import Select from '../../../formElements/select'
import Input from '../../../formElements/input'
import TextArea from '../../../formElements/textarea'
import * as Selects from './../selects'
import * as SharedSelects from '../../shared/selects'

export default class PcInfo extends React.Component<any, any> {

    public render() {
        const {
            machineType,
            cellularData,
            cellularDataJustification,
            employmentStatus,
            previouslyFunctioning,
            computerFunctioning,
            OTRSticket,
            accessories,
            availableAccessories,
            softwareApplications
        } = this.props.parentState

        const {
            setState,
            accessoriesTooltip,
            softwareTooltip
        } = this.props

        return <div className='col-md-6 col-md-offset-3 panel'>
            <div className='sectionHeader'>PC information</div>
            <div className='panel-body'>
                <Select
                    value={machineType}
                    header='What type of machine are you requesting?'
                    placeholder='Select machine type'
                    onChange={machineType => setState({ machineType })}
                    multi={false}
                    options={Selects.MachineTypes}
                    required
                />

                {machineType.value == 'Laptop' &&
                    <Select
                        value={cellularData}
                        header='Does the laptop need cellular data services?'
                        placeholder='Yes or no'
                        onChange={cellularData => setState({ cellularData })}
                        multi={false}
                        options={SharedSelects.YesNo}
                        required
                    />
                }

                {cellularData.value == 'Yes' &&
                    <TextArea
                        value={cellularDataJustification}
                        header="Why can't the employee perform their job functions using Wifi only?"
                        placeholder="Justify the need for cellular data services"
                        callback={e => setState({ cellularDataJustification: e.target.value })}
                        required
                    />
                }

                {employmentStatus.value === 'New' &&
                    <Select
                        value={previouslyFunctioning}
                        header='Was a functioning computer plugged into the desk network port in the previous month?'
                        placeholder='Yes or no'
                        onChange={previouslyFunctioning => setState({ previouslyFunctioning })}
                        multi={false}
                        options={SharedSelects.YesNo}
                        required
                    />
                }

                {employmentStatus.value === 'Existing' &&
                    <Select
                        value={computerFunctioning}
                        header='Is their current computer functioning?'
                        placeholder='Yes or no'
                        multi={false}
                        onChange={computerFunctioning => setState({ computerFunctioning })}
                        options={SharedSelects.YesNo}
                        required
                    />
                }
                {employmentStatus.value === 'Existing' &&
                    <Input
                        value={OTRSticket}
                        header="I&P must assess the current computer before replacement.  Please enter the OTRS ticket number associated with an I&P technician's assessment."
                        placeholder="OTRS ticket number"
                        callback={e => setState({ OTRSticket: e.target.value })}
                        required
                    />
                }

                {/* conditional fields end*/}
                <div className='tooltip-container'>
                    <a onClick={accessoriesTooltip.bind(this)}>View standard accessories</a>
                </div>
                <Select
                    value={accessories}
                    header='Select any necessary accessories'
                    placeholder='Accessories...'
                    onChange={accessories => setState({ accessories })}
                    multi={true}
                    options={availableAccessories}
                />

                <div className='tooltip-container'>
                    <a onClick={softwareTooltip.bind(this)}>View standard software applications</a>
                </div>
                <TextArea
                    value={softwareApplications}
                    header="Identify any non-standard software applications you would like"
                    placeholder="Dept. may be responsible for payment of licensed software"
                    callback={e => setState({ softwareApplications: e.target.value })}
                />
            </div>
        </div>
    }
}