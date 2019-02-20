import * as React from 'react'
import * as types from '../../../store/types'
import Modal from 'react-responsive-modal'

type props = {
    course: types.course
    registrationType: "Active" | "Waitlisted"
    registrationComplete: "Success" | "Error"
    setState: (stateObj: object) => void
    closeModal: () => void
}

export default class RegistrationComplete extends React.Component<props, {}> {

    public render() {
        return (
            <Modal
                open={true}
                onClose={this.props.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='text-center'>
                    {this.props.registrationComplete}
                </div>
            </Modal>
        )
    }
}