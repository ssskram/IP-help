import * as React from 'react'
import { Redirect } from 'react-router-dom'
import * as types from '../../../store/types'
import Spinner from '../../utilities/spinner'

type props = {
    user: types.user,
    liaisons: any
    itemType: string
    loadLiaisons: () => void
    accessDenied: (type: string) => void
}

export default class LS extends React.Component<props, any> {

    componentDidMount() {
        this.props.loadLiaisons()
    }

    checkStatus(user, liaisons) {
        const liaison = liaisons.find(ls => ls['user'] === user.email)
        if (liaison) return true
        else return false
    }

    render() {
        if (this.props.liaisons.length > 0) {
            const isLiaison = this.checkStatus(this.props.user, this.props.liaisons)
            if (!isLiaison) {
                this.props.accessDenied(this.props.itemType)
                return <Redirect to='/' />
            } else return null
        } else {
            return <div>
                <Spinner notice='...loading your account...' />
            </div>
        }

    }
}