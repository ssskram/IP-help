import * as React from 'react'

type props = {
    setState: (stateObj: object) => void
}

export default class BulkOrSingle extends React.Component<props, {}> {

    public render() {
        return <div className='col-md-12 text-center'>
            <h3>How much equipment do you need picked up?</h3>
            <button className='btn btn-primary' onClick={() => this.props.setState ({ bulk: false })}>A single item</button>
            <button className='btn btn-primary' onClick={() => this.props.setState ({ bulk: true })}>Multiple items</button>
        </div>
    }
}
