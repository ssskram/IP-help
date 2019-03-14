import * as React from 'react'
import { Link } from 'react-router-dom'

export default class Alerts extends React.Component {

    render() {
        return <div>
            <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '1.2em' }} className='alert alert-info'>
                    <div style={{ fontSize: '1.5em', padding: '5px' }}>Hungry to learn?!</div>
                    <div>Enrollment is now open for I&P training classes!</div>
                    <Link to={'/CourseRegistration'} className="alert-link">Click here to register now</Link>
                </div>
            </div>
            <div>
                <div style={{ fontSize: '1.2em' }} className='alert alert-warning'>
                    New service!  <Link to={'/equipmentDisposal'} className="alert-link">Dispose of unused IT equipment</Link>
                </div>
            </div>
            <div>
                <div style={{ fontSize: '1.2em' }} className='alert alert-warning'>
                    New service!  <Link to={'/equipmentLoan'} className="alert-link">Borrow equipment</Link>
                </div>
            </div>
        </div>

    }
}