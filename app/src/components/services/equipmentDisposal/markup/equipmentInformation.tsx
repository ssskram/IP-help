import * as React from 'react'
import Input from '../../../formElements/input'
import Select from '../../../formElements/select'
import Types from '../markup/equipmentTypes'
import UnsupportedItems from '../markup/unsupportedItems'
import ImageUploader from 'react-images-upload'

export default class equipmentInformation extends React.Component<any, any> {

    public render() {
        const {
            equipmentType,
            modelNumber,
            equipmentNumber,
            assetTagNumber,
            attachments,
        } = this.props.parentState

        const {
            setState
        } = this.props

        let imgButton
        if (attachments.length == 0) {
            imgButton = { display: 'block' }
        } else {
            imgButton = { display: 'none' }
        }

        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Equipment information<span className='glyphicon glyphicon-hdd pull-right'></span></div>
            <div className='panel-body'>
                <Select
                    value={equipmentType ? { value: equipmentType, label: equipmentType } : ''}
                    header='Equipment type'
                    placeholder='Select equipment type'
                    onChange={e => setState({ equipmentType: e.value })}
                    multi={false}
                    options={Types.equipmentTypes}
                    required
                />
                {equipmentType != "Mobile Device" &&
                    <div>
                        <UnsupportedItems />
                        <Input
                            value={modelNumber}
                            header="Model number"
                            placeholder="Enter model number"
                            callback={(e) => setState({ modelNumber: e.target.value })}
                        />

                        <Input
                            value={equipmentNumber}
                            header="Equipment number"
                            placeholder="Enter equipment number"
                            callback={(e) => setState({ equipmentNumber: e.target.value })}
                        />

                        <Input
                            value={assetTagNumber}
                            header="Asset tag"
                            placeholder="Enter numbers on asset tag"
                            callback={(e) => setState({ assetTagNumber: e.target.value })}
                        />

                        <div className='col-md-12'>
                            <ImageUploader
                                buttonStyles={imgButton}
                                withIcon={true}
                                buttonText='Attach an image'
                                onChange={attachments => setState({ attachments })}
                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                withLabel={false}
                                maxFileSize={5242880}
                                withPreview={true}
                                singleImage={true}
                            />
                        </div>
                    </div>
                }
                {equipmentType == "Mobile Device" &&
                    <div style={{ padding: '75px 5px 50px 5px' }} className='text-center'>
                        <br />
                        <h4>Due to passwords and access keys, mobile devices must be returned directly to I&P.</h4>
                        <br />
                        <h4><b>Please contact the Help Desk directly to dispose of this device.</b></h4>
                    </div>
                }
            </div>
        </div>
    }
}
