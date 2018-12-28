import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as MessageStore from '../../store/messages'
import HydrateStore from '../utilities/hydrateStore'
import Messages from '../utilities/messages'
import Alerts from './alerts'
import Services from './services'

const ipIcon = require('../../images/ip.png')

export class Home extends React.Component<any, any> {
    private ref: React.RefObject<any>
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    scrollServices() {
        this.ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }

    render() {
        return (
            <div className='text-center'>
                <HydrateStore />
                <div className='home-container-1'>
                    <div className='home-child-1 text-center'>
                        <img src={ipIcon as string} className="img-responsive center-block home-image" />
                        <h1>We're here to <b>help</b></h1>
                        <button onClick={this.scrollServices.bind(this)} className='btn btn-view-services'>
                            View products & services
                        </button>
                        <div>
                            <br />
                            <Messages />
                        </div>
                        <Alerts />
                    </div>
                </div>
                <div ref={this.ref} ></div>
                <div className='home-container-2'>
                    <div className='home-child-2'>
                        <Services />
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => ({
        ...state.messages
    }),
    ({
        ...MessageStore.actionCreators,
    })
)(Home)