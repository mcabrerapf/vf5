import './DirectionalButtons.scss'
import React from 'react';
import Notation from '../Notation';
import Button from '../Button';

const DirectionalButtons = ({
    disableButtons,
    isShiftActive,
    onClick = () => { }
}) => {
    return (
        <div className='directional-buttons'>

            <div className='directional-buttons__grouping'>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick('[7]')}
                >
                    <Notation notation="[7]" />
                </Button>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick(isShiftActive ? "[8_]" : "[8]")}
                >
                    <Notation
                        color={isShiftActive ? 'red' : ''}
                        notation={isShiftActive ? "[8_]" : "[8]"}
                    />
                </Button>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick('[9]')}
                >
                    <Notation notation="[9]" />
                </Button>

            </div>
            <div className='directional-buttons__grouping'>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick(isShiftActive ? "[4_]" : "[4]")}
                >
                    <Notation
                        color={isShiftActive ? 'red' : ''}
                        notation={isShiftActive ? "[4_]" : "[4]"}
                    />
                </Button>
                <Button
                    disabled={disableButtons}
                    text={'★'}
                    onClick={() => onClick("★")}
                >
                </Button>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick(isShiftActive ? "[6_]" : "[6]")}
                >
                    <Notation
                        color={isShiftActive ? 'red' : ''}
                        notation={isShiftActive ? "[6_]" : "[6]"}

                    />
                </Button>
            </div>
            <div className='directional-buttons__grouping'>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick('[1]')}
                >
                    <Notation notation="[1]" />
                </Button>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick(isShiftActive ? "[2_]" : "[2]")}
                >
                    <Notation
                        color={isShiftActive ? 'red' : ''}
                        notation={isShiftActive ? "[2_]" : "[2]"}
                    />
                </Button>
                <Button
                    disabled={disableButtons}
                    onClick={() => onClick('[3]')}
                >
                    <Notation notation="[3]" />
                </Button>

            </div>
        </div>
    )
}

export default DirectionalButtons;