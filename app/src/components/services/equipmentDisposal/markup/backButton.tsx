import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
}

export default class BackButton extends React.Component<props, {}> {

    public render() {
        return <div className='col-md-12 text-center'>
            <button onClick={() => this.props.setState({ bulk: undefined })} className='btn btn-warning'>Back</button>
        </div>
    }
}
