import * as React from 'react'
import * as types from '../../../store/types'
import Modal from 'react-responsive-modal'
import { Backpack } from 'react-kawaii'

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
                    {this.props.registrationComplete == "Success" &&
                        <div>
                            <h3><b>Success!</b></h3>
                            <h4>You're all registered.</h4>
                            <br />
                            <Backpack size={300} mood="blissful" color="#AED3E5" />
                            {this.props.registrationType == "Active" &&
                                <h4><br />You'll be receiving a confirmation email,<br /> and a calendar invite for this event.</h4>
                            }
                            {this.props.registrationType == "Waitlisted" &&
                                <div>
                                    <h4>If a spot becomes available,<br />you will automatically be moved off of the waitlist and into this course.</h4>
                                    <h4><b>We'll let you know as soon as this happens.</b></h4>
                                    <h4>In the meanwhile, feel free to check back here for your place in line.</h4>
                                </div>
                            }
                        </div>
                    }
                    {this.props.registrationComplete == "Error" &&
                        <div>
                            <h3><b>Uh oh!</b></h3>
                            <h4>That didn't work.</h4>
                            <br />
                            <Backpack size={300} mood="shocked" color="#AED3E5" />
                            <br />
                            <h4>Please log out, log back in, and try again</h4>
                            <h4>If this problem persists, please contact the I&P Help Desk</h4>
                        </div>
                    }
                </div>
            </Modal>
        )
    }
}