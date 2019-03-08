import * as React from 'react'
import Modal from 'react-responsive-modal'
import { Cat } from 'react-kawaii'
import Select from '../formElements/select'
import * as Selects from '../services/shared/selects'

type props = {
    setState: (stateObj: object) => void
    objectType: string
}

type state = {
    catMood: string,
    department: any
}
export default class AccessDenied extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            catMood: 'sad',
            department: undefined
        }
    }

    render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.setState({ accessDenied: false })}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
                <div className='text-center'>
                    <br />
                    <Cat size={220} mood={this.state.catMood} color="#596881" />
                    <h3 className='oswald-header'>Sorry,</h3>
                    <h4 className='oswald-header'>Only liaisons can order {this.props.objectType}.</h4>
                    <Select
                        value={this.state.department}
                        header='Select your department to view liaison(s)'
                        placeholder='Select department'
                        onChange={department => this.setState({ department, catMood: 'blissful' })}
                        multi={false}
                        options={Selects.Departments}
                    />
                </div>
            </Modal>
        )
    }
}