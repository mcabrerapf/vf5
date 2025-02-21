import React from 'react';
import './OtherButtons.scss'
import Button from '../Button';
import { ShiftIcon } from '../Icon';

const OtherButtons = ({
    isShiftActive,
    disableButtons,
    onClick = () => { },
    onShiftClick = () => { }
}) => {
    return (
        <div className='other-buttons'>
            <div className='other-buttons__grouping'>
                <Button
                    disabled={disableButtons}
                    modifier={"P"}
                    text="P"
                    onClick={() => onClick('[P]')}
                />
                <Button
                    disabled={disableButtons}
                    modifier={"K"}
                    text="K"
                    onClick={() => onClick('[K]')}
                />
                <Button
                    disabled={disableButtons}
                    modifier={"G"}
                    text="G"
                    onClick={() => onClick('[G]')}
                />
            </div>
            <div className='other-buttons__grouping'>
                <Button
                    disabled={disableButtons}
                    text="+"
                    onClick={() => onClick('[+]')}
                />
                <Button
                    disabled={disableButtons}
                    text="or"
                    onClick={() => onClick('[or]')}
                />
                <Button
                    disabled={disableButtons}
                    modifier={isShiftActive ? 'chit' : 'hit'}
                    text={isShiftActive ? 'ch' : 'hit'}
                    onClick={() => onClick(isShiftActive ? '[ch]' : '[hit]')}
                />
            </div>
            <div className='other-buttons__grouping'>
                <Button
                    disabled={disableButtons}
                    modifier={isShiftActive ? 'wb' : 'w'}
                    text={isShiftActive ? 'wb' : 'w'}
                    onClick={() => onClick(isShiftActive ? '[wb]' : '[w]')}
                />
                <Button
                    disabled={disableButtons}
                    modifier={'sd'}
                    text={'sd'}
                    onClick={() => onClick('[sd]')}
                />
                <Button
                    disabled={disableButtons}
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