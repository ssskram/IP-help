import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import * as User from '../../../store/user'
import * as Liaisons from '../../../store/liaisons'
import * as Messages from '../../../store/messages'

type props = {
    user: types.user,
    liaisons: types.liaisons,
    itemType: string
    accessDenied: (type: string) => boolean
}

export class LiaisonCheck extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.checkStatus = this.checkStatus.bind(this)
    }
    checkStatus(user, liaisons) {
        const liaison = liaisons.find(ls => ls['user'] === user.user)
        if (liaison) return true
        else return false
    }

    render() {
        const isLiaison = this.checkStatus(this.props.user, this.props.liaisons)
        if (!isLiaison) {
            this.props.accessDenied(this.props.itemType)
            return <Redirect to='/' />
        } else return null
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.liaisons,
        ...state.messages
    }),
    ({
        ...Liaisons.actionCreators,
        ...User.actionCreators,
        ...Messages.actionCreators
    })
)(LiaisonCheck as any)