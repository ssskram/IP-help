import * as React from 'react'
import { Link } from 'react-router-dom'

const computer = require('../../../images/computer.png')
const laptop = require('../../../images/laptop.png')
const email = require('../../../images/email.png')
const cellphone = require('../../../images/cellphone.png')
const tablet = require('../../../images/tablet2.png')
const dispose = require('../../../images/dispose.png')
const projector = require('../../../images/projector.png')
const employee = require('../../../images/employee.png')
const deskPhone = require('../../../images/deskPhone.png')
const globe = require('../../../images/globe.png')

const imgStyle = {
    height: '50px'
}

export default class Services extends React.Component {

    render() {
        return <div>
            <div className='row'>
                <div className='col-sm-6' style={{ padding: '0px 75px' }}>
                    <div style={{ fontSize: '3em' }}>I need to order a...</div>
                    <div className='col-sm-6'>
                        <Link to={'/NewPC'} className='btn btn-home text-center'>
                            <img src={computer as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>PC</span>
                        </Link>
                    </div>
                    <div className='col-sm-6'>
                        <Link to={'/NewPC'} className='btn  btn-home text-center'>
                            <img src={laptop as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Laptop</span>
                        </Link>
                    </div>
                    <div className="clearfix"></div>
                    <div className='col-sm-6'>
                        <a className='btn  btn-home text-center' target='_blank' title="Request a new user account" href='https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit'>
                            <img src={email as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>User account</span>
                        </a>
                    </div>
                    <div className='col-sm-6'>
                        <Link to={'/MobileDevice'} className='btn  btn-home text-center'>
                            <img src={cellphone as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Cellphone</span><br />
                        </Link>
                    </div>
                    <div className="clearfix"></div>
                    <div className='col-sm-6'>
                        <Link to={'/NewPC'} className='btn btn-home text-center'>
                            <img src={tablet as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Tablet</span>
                        </Link>
                    </div>
                    <div className='col-sm-6'>
                        <Link to={'/DeskPhone'} className='btn btn-home text-center'>
                            <img src={deskPhone as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Desk phone</span>
                        </Link>
                    </div>
                </div>
                <div className='hidden-sm hidden-md hidden-lg hidden-xl'>
                    <hr style={{ borderColor: '#fff' }} />
                    <br />
                </div>
                <div className='col-sm-6' style={{ padding: '0px 75px' }}>
                    <div style={{ fontSize: '3em' }}>I want to...</div>
                    <div className='col-sm-6'>
                        <Link to={'/InternationalTravel'} className='btn btn-home text-center'>
                            <img src={globe as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Notify I&P of international travel</span>

                        </Link>
                    </div>
                    <div className='col-sm-6'>
                        <Link to={'/EquipmentLoan'} className='btn  btn-home text-center'>
                            <img src={projector as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Borrow equipment</span>
                        </Link>
                    </div>
                    <div className="clearfix"></div>
                    <div className='col-sm-6'>
                        <Link to={'/EquipmentDisposal'} className='btn  btn-home text-center'>
                            <img src={dispose as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Get rid of equipment</span>
                        </Link>
                    </div>
                    <div className='col-sm-6'>
                        <Link to={'/EmployeeData'} className='btn btn-home text-center'>
                            <img src={employee as string} style={imgStyle} className="center-block" />
                            <span className='btn-home-header'>Request employee data</span>

                        </Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div style={{ fontSize: '3em', marginTop: '80px' }}>Something else?</div>
                <div className='col-sm-12'>
                    <Link to={'/Other'} style={{ maxWidth: '400px', border: '1px solid #337ab7', padding: '15px 0px' }} className='btn btn-home text-center'>
                        <span className='btn-home-header'>Blank ticket</span>
                    </Link>
                </div>
            </div>
        </div>

    }
}