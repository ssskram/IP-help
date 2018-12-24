import * as React from 'react'
import { checkAvailability } from '../availableItems'
import * as style from '../style'

const laptop = require('../../../../images/laptop.png')
const tablet = require('../../../../images/tablet.png')
const speakers = require('../../../../images/speakers.png')
const projector = require('../../../../images/projector.png')

export default class SelectEquipment extends React.Component<any, any> {

    public render() {
        const {
            availableItems,
            selectedTypes
        } = this.props.parentState

        const {
            addRemoveItem
        } = this.props

        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Equipment<span className='glyphicon glyphicon-blackboard pull-right'></span></div>
            <div className='panel-body'>
                <div role="alert" className="alert alert-info text-center">
                    If you don't see what you're looking for, it may be out of stock during this timeframe.  Please contact the Help Desk at 255-2900 for further assistance.
            </div>
                <div className='row text-center'>
                    {checkAvailability('Laptop', availableItems, 'Equipment') &&
                        <button onClick={() => addRemoveItem('Laptop', 'Equipment')} style={(selectedTypes.includes('Laptop')) ? style.clicked : style.unclicked} className='btn btn-big'>
                            <div className='col-md-12'>
                                <img style={style.imgSize} src={laptop as string} />
                            </div>
                            Laptop
                        </button>
                    }
                    {checkAvailability('Surface', availableItems, 'Equipment') &&
                        <button onClick={() => addRemoveItem('Surface', 'Equipment')} style={(selectedTypes.includes('Surface')) ? style.clicked : style.unclicked} className='btn btn-big'>
                            <div className='col-md-12'>
                                <img style={style.imgSize} src={tablet as string} />
                            </div>
                            Surface Tablet
                        </button>
                    }
                    {checkAvailability('Portable Projector', availableItems, 'Equipment') &&
                        <button onClick={() => addRemoveItem('Portable Projector', 'Equipment')} style={(selectedTypes.includes('Portable Projector')) ? style.clicked : style.unclicked} className='btn btn-big'>
                            <div className='col-md-12'>
                                <img style={style.imgSize} src={projector as string} />
                            </div>
                            Projector
                        </button>
                    }
                    {checkAvailability('Desktop Speakers', availableItems, 'Equipment') &&
                        <button onClick={() => addRemoveItem('Desktop Speakers', 'Equipment')} style={(selectedTypes.includes('Desktop Speakers')) ? style.clicked : style.unclicked} className='btn btn-big'>
                            <div className='col-md-12'>
                                <img style={style.imgSize} src={speakers as string} />
                            </div>
                            Desktop Speakers
                        </button>
                    }
                </div>
            </div>
        </div>
    }
}