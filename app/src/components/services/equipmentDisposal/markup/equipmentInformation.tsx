import * as React from 'react'
import TextArea from '../../../formElements/textarea'
import Select from '../../../formElements/select'
import Number from '../../../formElements/numbers'
import Types from '../markup/equipmentTypes'
import UnsupportedItems from '../markup/unsupportedItems'
import ImageUploader from 'react-images-upload'

export default class equipmentInformation extends React.Component<any, any> {

    public render() {
        const {
            quantityEquipment,
            equipmentType,
            modelNumber,
            equipmentNumber,
            assetTagNumber,
            image,
        } = this.props.parentState

        const { 
            setState
        } = this.props

        let imgButton
        if (image.length == 0) {
            imgButton = { display: 'block' }
        } else {
            imgButton = { display: 'none' }
        }

        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Equipment information<span className='glyphicon glyphicon-hdd pull-right'></span></div>
            <div className='panel-body'>
                <Select
                    value={equipmentType}
                    header='Equipment type'
                    placeholder='Select equipment type'
                    onChange={equipmentType => setState({ equipmentType })}
                    multi={false}
                    options={Types.equipmentTypes}
                    required
                />
                <UnsupportedItems />

                <Number
                    value={quantityEquipment}
                    header="Quantity of equipment"
                    prefix=""
                    callback={(e, m, f) => setState({ quantityEquipment: f })}
                    required
                />

                <TextArea
                    value={modelNumber}
                    header="Model numbers"
                    placeholder="Enter model numbers"
                    callback={(e) => setState({ modelNumber: e.target.value })}
                />

                <TextArea
                    value={equipmentNumber}
                    header="Equipment numbers"
                    placeholder="Enter equipment numbers"
                    callback={(e) => setState({ equipmentNumber: e.target.value })}
                />

                <TextArea
                    value={assetTagNumber}
                    header="Asset tags"
                    placeholder="Enter numbers on asset tags"
                    callback={(e) => setState({ assetTagNumber: e.target.value })}
                />

                <div className='col-md-12'>
                    <ImageUploader
                        buttonStyles={imgButton}
                        withIcon={true}
                        buttonText='Attach an image'
                        onChange={image => setState({ image })}
                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                        withLabel={false}
                        maxFileSize={5242880}
                        withPreview={true}
                        singleImage={true}
                    />
                </div>
            </div>
        </div>
    }
}
