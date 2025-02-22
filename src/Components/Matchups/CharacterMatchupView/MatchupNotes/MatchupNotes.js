import './MatchupNotes.scss'
import React from 'react'
import Note from '../../../Note';

const MatchupNotes = ({
    matchupNote,
    notes = []
}) => {

    return (
        <div
            className="matchup-notes"
        >
            <div
                className='matchup-notes__list'
            >
                {notes.map(note => {
                    if (!note) return null;
                    return (
                        <Note
                            note={note}
                        />
                    )
                })}
                {matchupNote &&
                    <Note
                        note={{ content: matchupNote }}
                    />}
            </div>
        </div>
    )
}

export default MatchupNotes;