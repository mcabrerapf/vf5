import React from 'react';
import './OtherButtons.scss'
import Notation from '../Notation';

const OtherButtons = ({
    isShiftActive,
    onClick,
    onShiftClick
}) => {
    return (
        <div className='other-buttons'>
            <div className='other-buttons__grouping'>
                <Notation
                    notation='[P]'
                    onClick={onClick}
                />
                <Notation
                    notation='[K]'
                    onClick={onClick}
                />
                <Notation
                    notation='[G]'
                    onClick={onClick}
                />
            </div>
            <div className='other-buttons__grouping'>
                <Notation
                    notation='[+]'
                    onClick={onClick}
                />
                <Notation
                    notation='or'
                    onClick={onClick}

                />
                <Notation
                    modifier={isShiftActive ? 'active' : ''}
                    notation={isShiftActive ? 'ch' : 'hit'}
                    onClick={onClick}
                />
            </div>
            <div className='other-buttons__grouping'>

                <Notation
                    modifier={isShiftActive ? 'active' : ''}
                    notation={isShiftActive ? 'wb' : 'w'}
                    onClick={onClick}
                />
                <Notation
                    notation='side'
                    onClick={onClick}
                />
                <Notation
                    modifier={isShiftActive ? 'active' : ''}
                    notation='shift'
                    onClick={onShiftClick}
                />
            </div>
        </div>
    )
}

export default OtherButtons;