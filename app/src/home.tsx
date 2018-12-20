import * as React from 'react'
import { Link } from 'react-router-dom'
import HydrateStore from './components/utilities/hydrateStore'
import Messages from './components/utilities/messages'

const imgSize = {
    height: '75px',
    margin: '10px'
}

const msIcon = require('./images/microsoft.png')
const faqIcon = require('./images/faq.png')
const ipIcon = require('./images/ip.png')

export default class Home extends React.Component<any, any> {

    componentDidMount () {
        window.scrollTo(0,0)
    }

    render() {
        return (
            <div className="home-container">
                <HydrateStore />
                <img src={ipIcon as string} className="img-responsive center-block home-image" style={{ backgroundColor: '#FAF7F2' }} />
                <div className='text-center'>
                    <h1>We're here to <strong>help</strong></h1>
                    <div className="row text-center">
                        <br />
                        <Messages />
                    </div>
                    <div style={{ marginTop: '20px' }} className='row text-center'>
                        <div style={{ fontSize: '1.5em' }} className='alert alert-info'>
                            Just published!  <a target='_blank' href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/I&PLiaisonGuidelinesv5.pdf" className="alert-link">FAQ for I&P Liaisons</a>
                        </div>
                    </div>
                    <div className='row text-center'>
                        <div style={{ fontSize: '1.5em' }} className='alert alert-info'>
                            Just published!  <a target='_blank' href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/PC%20Ordering%20Guidelines%2011_2018.pdf" className="alert-link">Guidelines for ordering PCs</a>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='row'>
                    <div className='col-md-6 text-center'>
                        <Link to={'/HelpContent'} className="btn btn-big" >
                            <div className='row'>
                                <div className='col-md-12'>
                                    <img style={imgSize} src={faqIcon as string} />
                                </div>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <h3>Training & FAQ</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-6 text-center'>
                        <a href="http://portal.office.com/" target="_blank" title="Email, OneDrive, etc." className="btn btn-big" >
                            <div className='row'>
                                <div className='col-md-12'>
                                    <img style={imgSize} src={msIcon as string} />
                                </div>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <h3>Microsoft portal</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}