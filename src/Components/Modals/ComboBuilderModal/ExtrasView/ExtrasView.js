import React from 'react';
import './ExtrasView.scss'

const ExtrasView = ({
    comboNote,
    setComboNote,
}) => {

    const handleNoteChange = ({ target: { value } }) => {
        setComboNote(value);
    }

    return (
        <div className='extras-view'>
            <div className='extras-view__note'>
                <label>Note</label>
                <textarea
                    value={comboNote}
                    onChange={handleNoteChange}
                />
            </div>
        </div>
    )
}

export default ExtrasView;