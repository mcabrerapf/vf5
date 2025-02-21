import './DataModal.scss'
import React from 'react';
import Button from '../../Button';
import DataView from './DataView';

const DataModal = () => {

    return (
        <div className='data-modal'>
            <div className='data-modal__header'>
                <Button
                modifier={'active'}
                    text='Data'
                />
            </div>
            <div className='data-modal__content'>
            <DataView />
            </div>
        </div>
    )
}

export default DataModal;