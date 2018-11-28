import * as React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const imgSize = {
    height: '20px',
    margin: '-3px 10px 0px 0px'
}

const msIcon = require('./../images/microsoft2.png')

const styleLarge = {
    position: 'absolute' as any,
    top: '0px',
    right: '0px',
    padding: '8px 15px 8px 45px',
    backgroundColor: '#5cb85c',
    borderRadius: '0px 0px 0px 15px',
    color: '#fff'
}

const styleSmall = {
    position: 'absolute' as any,
    top: '51px',
    right: '0px',
    padding: '5px',
    backgroundColor: '#5cb85c',
    width: '100%'
}

export default class Notice extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            showContact: false
        }
    }

    public render() {
        const {
            showContact
        } = this.state

        const header = <div><h5 style={{ color: '#fff' }}> <img style={imgSize} src={msIcon as string} /><b>Trouble with Microsoft?</b></h5></div>
        const contact =
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <h4 style={{ color: '#fff' }}>Contact Evolve 365 Live Support</h4>
                <h4 style={{ color: '#fff' }} className='hidden-sm hidden-md hidden-lg hidden-xl'><b><a href="tel:+1-844-279-8423">1-844-279-8423</a></b></h4>
                <h4 style={{ color: '#fff' }} className='hidden-xs'><b>1-844-279-8423</b></h4>
            </ReactCSSTransitionGroup>

        return <div onClick={() => this.setState({ showContact: !showContact })}>
            <div className='hidden-xl hidden-lg hidden-md hidden-sm text-center' style={styleSmall}>
                <div>{header}</div>
                {showContact == true &&
                    contact
                }
            </div>
            <div className='hidden-xs text-center' style={styleLarge}>
                <div>{header}</div>
                {showContact == true &&
                    contact
                }
            </div>
        </div>
    }

}

