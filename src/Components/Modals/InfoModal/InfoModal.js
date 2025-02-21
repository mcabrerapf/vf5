import './InfoModal.scss'
import React, { useState } from 'react';
import Button from '../../Button';

const InfoModal = () => {
    const [modalView, setModalView] = useState('data');

    return (
        <div className='info-modal'>
            <div className='info-modal__header'>
                <Button
                    disabled
                    modifier={modalView === 'info' ? 'active left' : 'left'}
                    text='Info'
                    onClick={() => setModalView('info')}
                />
                <Button
                    modifier={modalView === 'data' ? 'active right' : 'right'}
                    text='Data'
                    onClick={() => setModalView('data')}
                />
            </div>
            <div className='info-modal__content'>
                
            </div>
        </div>
    )
}

export default InfoModal;