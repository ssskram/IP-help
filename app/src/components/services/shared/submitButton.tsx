import * as React from 'react'
import Spinner from '../../utilities/spinner'

type props = {
    submit: () => void
}

type state = {
    spinner: boolean
}

export default class SubmitTicket extends React.Component<props, state> {
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
        return <div className='col-md-12 text-center'>
            <h4>Please review all information before submitting.</h4>
            <button onClick={this.submit.bind(this)} className='btn btn-success'>Submit</button>
            {this.state.spinner == true &&
                <Spinner notice='...submitting your request...' />
            }
        </div>
    }
}