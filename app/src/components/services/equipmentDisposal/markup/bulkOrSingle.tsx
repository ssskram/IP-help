import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
}

const bigFont = {
    fontSize: '1.5em'
}

export default class BulkOrSingle extends React.Component<props, {}> {

    public render() {
        return <div className='col-md-12 text-center'>
            <h3>How much equipment do you need picked up?</h3>
            <button className='btn btn-primary' onClick={() => this.props.setState({ bulk: false })}>
                <span style={bigFont}>A single item</span>
            </button>
            <button className='btn btn-primary' onClick={() => this.props.setState({ bulk: true })}>
                <span style={bigFont}>Multiple items</span>
            </button>
        </div>
    }
}
