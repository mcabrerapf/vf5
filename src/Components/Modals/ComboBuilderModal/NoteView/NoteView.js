import React from 'react';
import './NoteView.scss'

const NoteView = ({
    comboNote,
    setComboNote,
}) => {

    const handleNoteChange = ({ target: { value } }) => {
        setComboNote(value);
    }

    return (
        <div className='note-view'>
            <div className='note-view__note'>
                <textarea
                    value={comboNote}
                    onChange={handleNoteChange}
                />
            </div>
        </div>
    )
}

export default NoteView;