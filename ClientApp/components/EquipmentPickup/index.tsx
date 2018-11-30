import * as React from 'react'
import * as Ping from '../../store/ping'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Fields from './fields'

export class equipmentPickup extends React.Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()
    }

    public render() {
        return <div className='centered'>
            <div className="row text-center">
                <div className="col-md-12">
                    <h1>Request equipment pickup</h1>
                    <h4 className="form-h">Dispose of unused IT equipment</h4>
                    <br />
                </div>
            </div>
            <Fields />
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping
    }),
    ({
        ...Ping.actionCreators
    })
)(equipmentPickup as any) as typeof equipmentPickup;