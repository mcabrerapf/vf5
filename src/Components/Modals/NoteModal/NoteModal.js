import React, { useState } from 'react';
import './NoteModal.scss'
import Button from '../../Button';
import ModalFooter from '../ModalFooter';
import { useModalContext } from '../../../Contexts/ModalContext';

const NoteModal = ({
    selectedNote,
    handleDeleteNoteClick
}) => {
    const { id, content } = selectedNote || {};
    const { closeModal } = useModalContext();
    const [noteContent, setNoteContent] = useState(content || '');

    const handleSaveNote = () => {
        closeModal({
            id: id,
            content: noteContent,
        });
    }

    const handleNoteContentChange = ({ target: { value } }) => {
        setNoteContent(value);
    }

    const canSave = !!noteContent && !!noteContent.length;

    return (
        <div className='note-modal'>
            <div className='note-modal__content'>
                <textarea
                    value={noteContent}
                    onChange={handleNoteContentChange}
                />
            </div>
            <ModalFooter modifier="align-right">
                <div>
                    {id &&
                        <Button
                            text='DELETE'
                            onClick={() => {
                                closeModal();
                                handleDeleteNoteClick();
                            }}
                        />
                    }
                </div>

                <Button
                    text='✓'
                    disabled={!canSave}
                    onClick={handleSaveNote}
                />
            </ModalFooter>
        </div>
    )
}

export default NoteModal;