import React from 'react';
import './DirectionalButtons.scss'
import Notation from '../Notation';

const DirectionalButtons = ({
    onClick
}) => {
    return (
        <div className='directional-buttons'>
            <div className='directional-buttons__grouping'>
                <Notation icon="up" color='red' notation="[8_]" onClick={onClick} />
            </div>
            <div className='directional-buttons__grouping'>
                <Notation notation="[7]" onClick={onClick} />
                <Notation notation="[8]" onClick={onClick} />
                <Notation notation="[9]" onClick={onClick} />
            </div>
            <div className='directional-buttons__grouping'>
                <Notation notation="[4_]" color='red' onClick={onClick} />
                <Notation notation="[4]" onClick={onClick} />
                <div className='directional-buttons__grouping__center-spot'></div>
                <Notation notation="[6]" onClick={onClick} />
                <Notation notation="[6_]" onClick={onClick} />
            </div>
            <div className='directional-buttons__grouping'>
                <Notation notation="[1]" onClick={onClick} />
                <Notation notation="[2]" onClick={onClick} />
                <Notation notation="[3]" onClick={onClick} />
            </div>
            <div className='directional-buttons__grouping'>
                <Notation notation="[2_]" onClick={onClick} />
            </div>
        </div>
    )
}

export default DirectionalButtons;