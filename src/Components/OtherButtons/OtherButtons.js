import React from 'react';
import './OtherButtons.scss'
import Button from '../Button';
import { ShiftIcon } from '../Icon';

const OtherButtons = ({
    isShiftActive,
    onClick,
    onShiftClick
}) => {
    return (
        <div className='other-buttons'>
            <div className='other-buttons__grouping'>
                <Button
                    modifier={"P"}
                    text="P"
                    onClick={() => onClick('[P]')}
                />
                <Button
                    modifier={"K"}
                    text="K"
                    onClick={() => onClick('[K]')}
                />
                <Button
                    modifier={"G"}
                    text="G"
                    onClick={() => onClick('[G]')}
                />
            </div>
            <div className='other-buttons__grouping'>
                <Button
                    text="+"
                    onClick={() => onClick('[+]')}
                />
                <Button
                    text="or"
                    onClick={() => onClick('[or]')}
                />
                <Button
                    modifier={isShiftActive ? 'chit' : 'hit'}
                    text={isShiftActive ? 'ch' : 'hit'}
                    onClick={() => onClick(isShiftActive ? '[ch]' : '[hit]')}
                />
            </div>
            <div className='other-buttons__grouping'>
                <Button
                    modifier={isShiftActive ? 'wb' : 'w'}
                    text={isShiftActive ? 'wb' : 'w'}
                    onClick={() => onClick(isShiftActive ? '[wb]' : '[w]')}
                />
                <Button
                    modifier={'sd'}
                    text={'sd'}
                    onClick={() => onClick('[sd]')}
                />
                <Button
                    modifier={isShiftActive ? 'active' : ''}
                    onClick={onShiftClick}
                >
                    <ShiftIcon />
                </Button>
            </div>
        </div>
    )
}

export default OtherButtons;