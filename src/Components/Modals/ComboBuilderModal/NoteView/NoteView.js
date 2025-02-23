import React from 'react';
import './NoteView.scss'
import TextWithCommand from '../../../TextWithCommand';
import { stringNotationParser } from '../../../../helpers';

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
                <div className='note-view__note__message'>
                    *Supports input notation [2_6p+k] <TextWithCommand content={stringNotationParser('[2_6p+k]')} />
                </div>
            </div>
        </div>
    )
}

export default NoteView;