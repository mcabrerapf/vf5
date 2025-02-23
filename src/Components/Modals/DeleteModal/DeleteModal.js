import React from 'react';
import './DeleteModal.scss'
import Button from '../../Button';
import { useModalContext } from '../../../Contexts/ModalContext';
import Combo from '../../Combo';
import ModalFooter from '../ModalFooter';
import Note from '../../Note';

const DeleteModal = ({
    data = {},
    combosFilterOptions
}) => {
    const { closeModal } = useModalContext();
    const { command, content } = data;

    const handleClose = (shouldDelete) => {
        closeModal(shouldDelete);
    }
    const characterFilterOptions =combosFilterOptions.filter(cOption=>cOption.key === 'character_tags');
    console.log(combosFilterOptions)
    return (
        <div className='delete-modal'>
            <div className='delete-modal__content'>
                {!!command &&
                    <Combo
                        combo={data}
                        combosFilterOptions={combosFilterOptions}
                        characterFilterOptions={characterFilterOptions}
                        hideEditButton
                    />
                }
                {!!content &&
                    <Note
                        note={data}
                    />
                }
            </div>
            <ModalFooter>
                <Button
                    modifier={'danger'}
                    text='DEL'
                    onClick={() => handleClose(true)}
                />
                <Button
                    modifier={'cancel'}
                    text='CANCEL'
                    onClick={() => handleClose()}
                />
            </ModalFooter>
        </div>
    )
}

export default DeleteModal;