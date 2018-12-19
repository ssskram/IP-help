import * as React from 'react'

export default class SubmitTicket extends React.Component<any, any> {

    public render() {
        const {
            submit
        } = this.props
        
        return <div className='col-md-6 col-md-offset-3 panel'>
            <div className='panel-body text-center'>
                <h3>Please review all information before submitting.</h3>
                <button onClick={submit.bind(this)} className='btn btn-success'>Submit</button>
            </div>
        </div>
    }
}