import * as React from 'react'
import FileUpload from '../../../formElements/fileImport'

type props = {
    setState: (stateObj: object) => void
    attachments: Array<any>
}

const bigFont = {
    fontSize: '1.2em'
}

export default class Bulk extends React.Component<props, {}> {

    public render() {
        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Bulk Disposal<span className='glyphicon glyphicon-hdd pull-right'></span></div>
            <div className='panel-body'>
                <h4><b>Step One</b></h4>
                <a style={bigFont} target='_blank' href='https://blobby.blob.core.usgovcloudapi.net/iphelp/BulkDisposal.xlsx'>
                    Download and complete this spreadsheet
                </a>
                <h4><b>Step Two</b></h4>
                <p style={bigFont}>Upload completed spreadsheet here:</p>
                <FileUpload
                    header=''
                    attachments={this.props.attachments}
                    multi={false}
                    callback={this.props.setState.bind(this)}
                />
            </div>
        </div>
    }
}
