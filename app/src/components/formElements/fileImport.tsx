import * as React from 'react'
import Dropzone from 'react-dropzone'

const baseStyle = {
    width: '100%',
    height: 'auto',
    backgroundColor: '#DDDADA',
    padding: '10px',
    margin: '0 auto',
    borderRadius: 5
}

const deleteBtn = {
    backgroundColor: 'transparent',
    border: 'transparent',
    fontWeight: 600,
    color: 'red'
}

export default class fileImport extends React.Component<any, any> {
    
    addAttachment(attachments) {
        this.props.callback({ attachments })
    }

    deleteAttachment() {
        this.props.callback({ attachments: []})
    }

    public render() {
        const attachments = this.props.attachments.map((file, key) => (
            <div key={key}>
                <button style={deleteBtn} onClick={this.deleteAttachment.bind(this)}>X</button>{file.name}
            </div>
        ))
        return (
            <div className='col-md-12'>
                {attachments.length == 0 &&
                    <div>
                        <h4 className="form-h4">{this.props.header}{this.props.required == true && <span style={{ color: 'red', fontSize: '20' }}>*</span>}</h4>
                        <Dropzone
                            multiple={this.props.multi}
                            onDrop={this.addAttachment.bind(this)}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className='text-center' style={baseStyle} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <span style={{ color: '#3f4257' }}>Drop a file here</span>
                                    <br />
                                    <button className='chooseFileButton'>Or select to upload</button>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                }
                {attachments.length > 0 &&
                    <div style={{ marginTop: '15px' }}>
                        <h4>Attachment:</h4>
                        {attachments}
                    </div>
                }
            </div>
        )
    }
}