import './InfoModal.scss'
import React, { useState } from 'react';
import Button from '../../Button';
import ModalHeader from '../ModalHeader';
import DataView from './DataView';

const InfoModal = () => {
    const [modalView, setModalView] = useState('data');

    return (
        <div className='info-modal'>
            <ModalHeader>
                <Button
                    disabled
                    modifier={modalView === 'info' ? 'active' : ''}
                    text='Info'
                    onClick={() => setModalView('info')}
                />
                <Button
                    modifier={modalView === 'data' ? 'active' : ''}
                    text='Data'
                    onClick={() => setModalView('data')}
                />
            </ModalHeader>
            <div className='info-modal__content'>
                {modalView === 'data' && <DataView />}
            </div>
        </div>
    )
}

export default InfoModal;