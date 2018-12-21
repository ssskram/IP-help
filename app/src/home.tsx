import * as React from 'react'
import { Link } from 'react-router-dom'
import HydrateStore from './components/utilities/hydrateStore'
import Messages from './components/utilities/messages'

const ipIcon = require('./images/ip.png')

export default class Home extends React.Component<any, any> {
    private ref: React.RefObject<any>
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className='text-center'>
                <HydrateStore />
                <div className='home-container-1'>
                    <div className='home-child-1 text-center'>
                        <img src={ipIcon as string} className="img-responsive center-block home-image" />
                        <h1>We're here to <b>help</b></h1>
                        <button style={{ fontSize: '1.2em' }} onClick={() => this.ref.current.scrollIntoView({ block: 'center', behavior: "smooth" })} className='btn btn-primary'>View services</button>
                        <div>
                            <br />
                            <Messages />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ fontSize: '1.5em' }} className='alert alert-warning'>
                                New feature!  <Link to={'/equipmentLoan'} className="alert-link">Borrow equipment</Link>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5em' }} className='alert alert-info'>
                                Just published!  <a target='_blank' href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/I&PLiaisonGuidelinesv5.pdf" className="alert-link">FAQ for I&P Liaisons</a>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5em' }} className='alert alert-info'>
                                Just published!  <a target='_blank' href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/PC%20Ordering%20Guidelines%2011_2018.pdf" className="alert-link">Guidelines for ordering PCs</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-container-2'>
                    <div ref={this.ref} className='home-child-2'>
                        <div style={{ fontSize: '3em' }}>Services</div>
                        <br />
                        <div className='col-sm-6'>
                            <Link to={'/NewPC'} className='btn btn-primary btn-home text-center'>
                                <span className='btn-home-header'>New PC</span><br />
                                <span className='btn-home-body'>Desktop PCs, laptops, and thin clients</span>
                            </Link>
                        </div>
                        <div className='col-sm-6'>
                            <a className='btn btn-primary btn-home text-center' target='_blank' title="Request a new user account" href='https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit'>
                                <span className='btn-home-header'>New user account</span><br />
                                <span className='btn-home-body'>Network account & email address for a City employee</span>
                            </a>
                        </div>
                        <div className="clearfix"></div>
                        <div className='col-sm-6'>
                            <Link to={'/MobileDevice'} className='btn btn-primary btn-home text-center'>
                                <span className='btn-home-header'>New Mobile Device</span><br />
                                <span className='btn-home-body'>Smartphones, tablets, and flip phones</span>
                            </Link>
                        </div>
                        <div className='col-sm-6'>
                            <Link to={'/EquipmentLoan'} className='btn btn-primary btn-home text-center'>
                                <span className='btn-home-header'>Borrow equipment</span><br />
                                <span className='btn-home-body'>Smartphones, tablets, and flip phones</span>
                            </Link>
                        </div>
                        <div className="clearfix"></div>
                        <div className='col-sm-6'>
                            <Link to={'/EquipmentDisposal'} className='btn btn-primary btn-home text-center'>
                                <span className='btn-home-header'>IT equipment disposal</span><br />
                                <span className='btn-home-body'>Dispose of broken or unused IT equipment</span>
                            </Link>
                        </div>
                        <div className='col-sm-6'>
                            <Link to={'/EquipmentDisposal'} className='btn btn-primary btn-home text-center'>
                                <span className='btn-home-header'>Employee data</span><br />
                                <span className='btn-home-body'>Request email or email cellular records</span>
                            </Link>
                        </div>
                        <div className='col-sm-12'>
                            <Link to={'/Other'} className='btn btn-primary btn-home text-center'>
                                <span className='btn-home-header'>New ticket</span><br />
                                <span className='btn-home-body'>Don't see what you're looking for?  Tell us what you need.</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}