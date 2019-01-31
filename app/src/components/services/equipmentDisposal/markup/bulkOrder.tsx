import * as React from 'react'
import FileUpload from '../../../formElements/fileImport'

type props = {
    setState: (stateObj: object) => void
    attachment: Array<any>
}

export default class Bulk extends React.Component<props, {}> {

    public render() {
        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Bulk Disposal<span className='glyphicon glyphicon-hdd pull-right'></span></div>
            <div className='panel-body'>
                <h4><b>Step One</b></h4>
                Download and complete this spreadsheet
                <h4><b>Step Two</b></h4>
                <FileUpload
                    header={'Upload spreadsheet here'}
                    attachments={this.props.attachment}
                    multi={false}
                    callback={this.props.setState.bind(this)}
                />
            </div>
        </div>
    }
}
