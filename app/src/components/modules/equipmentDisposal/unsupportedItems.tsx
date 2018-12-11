import * as React from 'react'
import Modal from 'react-responsive-modal'

export default class unsupportedItems extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false
        }
    }

    public render() {
        return <div className='col-md-12 text-center'>
            <a onClick={() => this.setState({ modalIsOpen: true })} style={{ cursor: 'pointer' }}>Don't see what you're looking for?</a>
            <Modal
                open={this.state.modalIsOpen}
                onClose={() => this.setState({ modalIsOpen: false })}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                animationDuration={1000}
                center>
                <div className='col-md-12 text-center'>
                    <br />
                    <h3>For toner & ink cartridges, call Amcom</h3>
                    <h4>1 (800)-287-5549</h4>
                    <br />
                    <h3>For TVs and all other furniture, contact DPW</h3>
                    <br />
                </div>
            </Modal>
        </div>
    }
}
