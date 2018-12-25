import * as React from 'react'
import { Link } from 'react-router-dom'
import HydrateStore from './components/utilities/hydrateStore'
import Messages from './components/utilities/messages'

const ipIcon = require('./images/ip.png')
const computer = require('./images/computer.png')

export default class Home extends React.Component<any, any> {
    private ref: React.RefObject<any>
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    scrollServices () {
        this.ref.current.scrollIntoView({ block: 'start', behavior: 'smooth'})
    }

    render() {
        return (
            <div className='text-center'>
                <HydrateStore />
                <div className='home-container-1'>
                    <div className='home-child-1 text-center'>
                        <img src={ipIcon as string} className="img-responsive center-block home-image" />
                        <h1>We're here to <b>help</b></h1>
                        <button onClick={this.scrollServices.bind(this)} className='btn btn-view-services'>View services</button>
                        <div>
                            <br />
                            <Messages />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ fontSize: '1.2em' }} className='alert alert-warning'>
                                New feature!  <Link to={'/equipmentLoan'} className="alert-link">Borrow equipment</Link>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.2em' }} className='alert alert-info'>
                                Just published!  <a target='_blank' href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/I&PLiaisonGuidelinesv5.pdf" className="alert-link">FAQ for I&P Liaisons</a>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.2em' }} className='alert alert-info'>
                                Just published!  <a target='_blank' href="https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/IPHelp/PC%20Ordering%20Guidelines%2011_2018.pdf" className="alert-link">Guidelines for ordering PCs</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={this.ref} ></div>
                <div className='home-container-2'>
                    <div className='home-child-2'>
                        <div className='row'>
                            <div className='col-sm-6' style={{ padding: '0px 75px' }}>
                                <div style={{ fontSize: '3em' }}>I need a...</div>
                                <br />
                                <div className='col-xs-6'>
                                    <Link to={'/NewPC'} className='btn btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>PC</span>
                                    </Link>
                                </div>
                                <div className='col-xs-6'>
                                    <Link to={'/NewPC'} className='btn  btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Laptop</span>
                                    </Link>
                                </div>
                                <div className="clearfix"></div>
                                <div className='col-xs-6'>
                                    <a className='btn  btn-home text-center' target='_blank' title="Request a new user account" href='https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Email Address</span>
                                    </a>
                                </div>
                                <div className='col-xs-6'>
                                    <a className='btn  btn-home text-center' target='_blank' title="Request a new user account" href='https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Network account</span>
                                    </a>
                                </div>
                                <div className="clearfix"></div>
                                <div className='col-xs-6'>
                                    <Link to={'/MobileDevice'} className='btn  btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Cellphone</span><br />
                                    </Link>
                                </div>
                                <div className='col-xs-6'>
                                    <Link to={'/MobileDevice'} className='btn  btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Tablet</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-sm-6' style={{ padding: '0px 75px' }}>
                                <div style={{ fontSize: '3em' }}>I want to...</div>
                                <br />
                                <div className='col-xs-6'>
                                    <Link to={'/EquipmentLoan'} className='btn  btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Borrow equipment</span>
                                    </Link>
                                </div>
                                <div className='col-xs-6'>
                                    <Link to={'/EquipmentDisposal'} className='btn  btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Get rid of equipment</span>
                                    </Link>
                                </div>
                                <div className="clearfix"></div>
                                <div className='col-xs-6'>
                                    <Link to={'/EmployeeData'} className='btn btn-home text-center'>
                                        <img src={computer as string} className="center-block" />
                                        <span className='btn-home-header'>Request employee data</span>

                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div style={{ fontSize: '3em', marginTop: '80px' }}>Something else?</div>
                            <div className='col-sm-12'>
                                <Link to={'/Other'} style={{ maxWidth: '400px', border: '1px solid #337ab7', }} className='btn btn-home text-center'>
                                    <img src={computer as string} className="center-block" />
                                    <span className='btn-home-header'>Blank ticket</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}