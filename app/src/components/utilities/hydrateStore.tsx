
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as user from '../../store/user'
import * as liaisons from '../../store/liaisons'
import * as equipmentLoans from '../../store/equipmentLoan'
import * as equipment from '../../store/equipment'

class Hydrate extends React.Component<any, {}> {

    componentDidMount() {
        this.props.loadUser()
        this.props.loadLiaisons()
        this.props.loadEquipmentLoans()
        this.props.loadEquipment()
    }

    componentWillReceiveProps(nextProps) {
        console.log('New store')
        console.log(nextProps)
    }

    public render() {
        return null
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.liaisons,
        ...state.loans,
        ...state.equipment
    }),
    ({
        ...user.actionCreators,
        ...liaisons.actionCreators,
        ...equipmentLoans.actionCreators,
        ...equipment.actionCreators
    })
)(Hydrate)