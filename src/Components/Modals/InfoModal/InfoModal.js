import './InfoModal.scss'
import React, { useState } from 'react';
import Button from '../../Button';
import Notation from '../../Notation';
import { WEIGHT_CLASES, CHARACTERS_JSON } from '../../../constants';
import { ChevronDown, ChevronUp } from '../../Icon';

const InfoModal = () => {
    const [showFrameData, setShowFrameData] = useState(true);
    const [showNotations, setShowNotations] = useState(true);
    const [showWeights, setShowWeights] = useState(true);

    const notations = [
        { name: 'Move separator:', value: '[⊙]' },
        { name: 'Launcher separator:', value: '[⊙]', modifier: 'launcher-separator' },
        { name: 'Tap:', value: '[2]' },
        { name: 'Hold:', value: '[2_]' },
        { name: 'Punch:', value: '[P]' },
        { name: 'Kick:', value: '[K]' },
        { name: 'Guard:', value: '[G]' },
        { name: 'Hit:', value: '[hit]' },
        { name: 'Counter Hit:', value: '[ch]' },
        { name: 'Wall:', value: '[w]' },
        { name: 'Wall Behind:', value: '[wb]' },
        { name: 'Side:', value: '[sd]' },
    ]
    return (
        <div className='info-modal'>
            <div className='info-modal__header'>
                <Button
                    modifier={'active'}
                    text='Info'
                />
            </div>
            <div className='info-modal__content'>
                <div
                    className='info-modal__content__frame-data'
                >
                    <Button
                        modifier={'active center header'}
                        onClick={() => setShowFrameData(!showFrameData)}
                    >
                        <span>FRAME DATA</span>
                        {showFrameData ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                    {showFrameData &&
                        <div
                            className='info-modal__content__frame-data__content'
                        >
                            <div
                                className='info-modal__content__frame-data__content__item throw-punish'
                            >
                                Throw attempt: 10 or -10
                            </div>
                            <div
                                className='info-modal__content__frame-data__content__item jab-punish'
                            >
                                Jab punish: 12 or -12
                            </div>
                            <div
                                className='info-modal__content__frame-data__content__item string-punish'
                            >
                                String punish: 15 or -15
                            </div>
                            <div
                                className='info-modal__content__frame-data__content__item launch-punish'
                            >
                                Launch punish: 17 or -17
                            </div>
                            <div
                                className='info-modal__content__frame-data__content__item'
                            >
                                D: Down (launches) S: Stagger
                            </div>
                            <div
                                className='info-modal__content__frame-data__content__item'
                            >
                                Dodges: Any(〇) Forward (F) Back (B)  Undodgable (×)
                            </div>
                        </div>
                    }
                </div>
                <div
                    className='info-modal__content__notations'
                >
                    <Button
                        modifier={'active center header'}
                        onClick={() => setShowNotations(!showNotations)}
                    >
                        <span>NOTATIONS</span>
                        {showNotations ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                    {showNotations &&
                        <div
                            className='info-modal__content__notations__content'
                        >
                            {notations.map(notation =>
                                <div
                                    className='info-modal__content__notations__content__notation'
                                >
                                    <span
                                        className='info-modal__content__notations__content__notation__description'
                                    >
                                        {notation.name}
                                    </span>
                                    <Notation
                                        notation={notation.value}
                                        modifier={notation.modifier}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div
                    className='info-modal__content__weight-data'
                >
                    <Button
                        modifier={'active center header'}
                        onClick={() => setShowWeights(!showWeights)}
                    >
                        <span>WEIGHT CLASSES</span>
                        {showWeights ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                    {showWeights &&
                        <div
                            className='info-modal__content__weight-data__content'
                        >
                            {WEIGHT_CLASES.map(weightClass => {
                                return (
                                    <div
                                        className='info-modal__content__weight-data__content__category'
                                    >
                                        <div
                                            className='info-modal__content__weight-data__content__category__header'
                                        >
                                            {weightClass.name} ({weightClass.short_name})
                                        </div>
                                        <div
                                            className='info-modal__content__weight-data__content__category__characters'
                                        >
                                            {weightClass.characters.map(charId => {
                                                const { short_name } = CHARACTERS_JSON[charId];
                                                return (
                                                    <Button
                                                        modifier={`${weightClass.short_name} s`}
                                                        text={short_name}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default InfoModal;