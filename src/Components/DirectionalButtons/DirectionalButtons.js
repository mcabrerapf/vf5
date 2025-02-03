import React from 'react';
import './DirectionalButtons.scss'
import Notation from '../Notation';

const DirectionalButtons = ({
    isShiftActive,
    onClick
}) => {
    return (
        <div className='directional-buttons'>

            <div className='directional-buttons__grouping'>
                <Notation notation="[7]" onClick={onClick} />
                <Notation
                    color={isShiftActive ? 'red' : ''}
                    notation={isShiftActive ? "[8_]" : "[8]"}
                    onClick={onClick}
                />
                <Notation notation="[9]" onClick={onClick} />
            </div>
            <div className='directional-buttons__grouping'>
                <Notation
                    color={isShiftActive ? 'red' : ''}
                    notation={isShiftActive ? "[4_]" : "[4]"}
                    onClick={onClick}
                />
                <div
                    className='directional-buttons__grouping__center-spot'
                    onClick={() => onClick('⊙')}
                />
                <Notation
                    color={isShiftActive ? 'red' : ''}
                    notation={isShiftActive ? "[6_]" : "[6]"}
                    onClick={onClick}
                />
            </div>
            <div className='directional-buttons__grouping'>
                <Notation notation="[1]" onClick={onClick} />
                <Notation
                    color={isShiftActive ? 'red' : ''}
                    notation={isShiftActive ? "[2_]" : "[2]"}
                    onClick={onClick}
                />
                <Notation notation="[3]" onClick={onClick} />
            </div>
        </div>
    )
}

export default DirectionalButtons;