import React from 'react';
import './Note.scss'
import { stringNotationParser } from '../../helpers';
import TextWithCommand from '../TextWithCommand';
const Note = ({
    note,
    handleNoteClick = () => { }
}) => {
    if (!note) return null;
    const { content } = note;
    const contentWithCommands = stringNotationParser(content);

    return (
        <li
            key={note.id}
            className='note'
        >
            <div
                className='note__content'
                onClick={() => handleNoteClick(note)}

            >
                <TextWithCommand
                    content={contentWithCommands}
                />
            </div>
        </li>
    )
}

export default Note;