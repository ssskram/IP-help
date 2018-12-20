import * as React from 'react'
import Spinner from '../../../utilities/spinner'

export default class SubmitTicket extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            spinner: false
        }
    }

    submit(event) {
        event.preventDefault()
        this.setState({ spinner: true })
        this.props.submit()
    }

    public render() {
        return <div className='col-md-6 col-md-offset-3 panel'>
            <div className='panel-body text-center'>
                <h3>Please review all information before submitting.</h3>
                <button onClick={this.submit.bind(this)} className='btn btn-success'>Submit</button>
            </div>
            {this.state.spinner == true &&
                <Spinner notice='...submitting your request...' />
            }
        </div>
    }
}