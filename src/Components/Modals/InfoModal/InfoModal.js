import './InfoModal.scss'
import React from 'react';
import Button from '../../Button';
import { WEIGHT_CLASES, CHARACTERS_JSON } from '../../../constants';

const InfoModal = () => {

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
                    <div
                        className='info-modal__content__frame-data__header'
                    >
                        Frame Data:
                    </div>
                    <div
                        className='info-modal__content__frame-data throw-punish'
                    >
                        Throw attempt: 10 or -10
                    </div>
                    <div
                        className='info-modal__content__frame-data jab-punish'
                    >
                        Jab punish: 12 or -12
                    </div>
                    <div
                        className='info-modal__content__frame-data string-punish'
                    >
                        String punish: 15 or -15
                    </div>
                    <div
                        className='info-modal__content__frame-data launch-punish'
                    >
                        Launch punish: 17 or -17
                    </div>
                </div>
                <div
                    className='info-modal__content__weight-data'
                >
                    <div
                        className='info-modal__content__weight-data__header'
                    >
                        Weight classes
                    </div>
                    <div
                        className='info-modal__content__weight-data__categories'
                    >
                        {WEIGHT_CLASES.map(weightClass => {
                            return (
                                <div
                                    className='info-modal__content__weight-data__categories__category'
                                >
                                    <div
                                        className='info-modal__content__weight-data__categories__category__header'
                                    >
                                        {weightClass.name} ({weightClass.short_name})
                                    </div>
                                    <div
                                        className='info-modal__content__weight-data__categories__category__characters'
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
                </div>
            </div>
        </div>
    )
}

export default InfoModal;