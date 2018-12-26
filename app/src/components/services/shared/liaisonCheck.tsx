import * as React from 'react'
import { Redirect } from 'react-router-dom'
import * as types from '../../../store/types'

type props = {
    user: types.user,
    liaisons: types.liaisons
    itemType: string
    accessDenied: (type: string) => void
}

export default class LS extends React.Component<props, any> {

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