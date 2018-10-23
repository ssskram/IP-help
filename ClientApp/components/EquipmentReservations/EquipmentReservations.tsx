import * as React from 'react'
import * as Reservations from '../../store/reservations'
import * as Equipment from '../../store/equipment'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'

export class EquipmentReservations extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {

        }
    }
    
    componentDidMount() {
        this.props.loadEquipment()
        this.props.loadReservations()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    public render() {
        return <div>Yo</div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.reservations,
        ...state.equipment
    }),
    ({
        ...Reservations.actionCreators,
        ...Equipment.actionCreators
    })
)(EquipmentReservations as any) as typeof EquipmentReservations;