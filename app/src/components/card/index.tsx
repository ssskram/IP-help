import * as React from 'react'
import LoadingImage from '../utilities/loadingImage'

const imgStyle = {
    width: '150px',
    height: '150px',
    margin: '0 auto'
}

const feedback = {
    backgroundColor: 'rgba(92, 184, 92, .2)',
    padding: '5px',
    margin: '5px',
    borderRadius: '10px'
}

export default class RequestCard extends React.Component<any, any> {

    public render() {
        const {
            request
        } = this.props

        return (
            <div className="container-fluid">
                <div className="panel">
                    <div className="panel-body text-center">
                        <div className="col-md-6">
                            <h3><b>{request.building}</b></h3>
                            <h5>{request.location}</h5>
                            <div style={{ margin: '10px' }} className='hidden-xs'>
                                <LoadingImage style={imgStyle} src={"https://tools.wprdc.org/images/pittsburgh/facilities/" + request.building.replace(/ /g, "_") + ".jpg"} />
                                <p>Request ID: {request.cartegraphID}</p>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ marginTop: '20px' }}>
                            <h4><b>Submitted {request.submitted}</b></h4>
                            <h5><b>{request.issue}</b></h5>
                            <h5>"{request.description}"</h5>
                            <p className='hidden-sm hidden-md hidden-lg hidden-xl'>Request ID: {request.cartegraphID}</p>
                            <div style={feedback}>
                                <h5><b>DPW Feedback</b></h5>
                                <h5>Status: {request.status}</h5>
                                <h5>Last activity: {request.lastModified}</h5>
                                <h5><i>{request.notes}</i></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}