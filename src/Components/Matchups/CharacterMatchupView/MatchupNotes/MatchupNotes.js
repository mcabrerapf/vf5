import './MatchupNotes.scss'
import React, { useState } from 'react'
import Button from '../../../Button'
import { ChevronDown, ChevronUp } from '../../../Icon';
import Note from '../../../Note';
import { getNotes } from '../../../../services';

const MatchupNotes = ({
    matchupId,
    matchupNote
}) => {
    const [showNotes, setShowNotes] = useState(true);
    const notes = getNotes(matchupId)
    const hasNoNotes = !notes?.length && !matchupNote;
    
    return (
        <div
            children="matchup-notes"
        >
            <div
                className='matchup-notes__header'
            >
                <Button
                    disabled={hasNoNotes}
                    modifier={'active center'}
                    onClick={() => setShowNotes(!showNotes)}
                >
                    <span>NOTES</span>
                    {showNotes ? <ChevronDown /> : <ChevronUp />}
                </Button>
            </div>
            <div
                className='matchup-notes__list'
            >
                {showNotes && notes.map(note => {
                    if (!note) return null;
                    return (
                        <Note
                            note={note}
                        />
                    )
                })}
                {showNotes && matchupNote &&
                    <Note
                        note={{ content: matchupNote }}
                    />
                }
            </div>
        </div>
    )
}

export default MatchupNotes;