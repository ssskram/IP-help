import * as React from 'react'
import { Link } from 'react-router-dom'

export default class Alerts extends React.Component {

    render() {
        return <div>
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

    }
}