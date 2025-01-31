import React from 'react';
import './OtherButtons.scss'
import Notation from '../Notation';

const OtherButtons = ({
    onClick
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
                    notation='ch'
                    onClick={onClick}
                />
            </div>
        </div>
    )
}

export default OtherButtons;