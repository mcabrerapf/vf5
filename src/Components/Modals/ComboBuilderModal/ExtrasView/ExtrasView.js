import React from 'react';
import './ExtrasView.scss'

const ExtrasView = ({
    comboDamage,
    comboNote,
    setComboDamage,
    setComboNote,
}) => {
    const handleDamageChange = ({ target: { value } }) => {
        const parsedDamage = isNaN(value) ? 1 : value;
        const maxChecked = Number(parsedDamage) > 999 ? 999 : parsedDamage;
        setComboDamage(maxChecked);
    }

    const handleDamageBlur = ({ target: { value } }) => {
        const parsedDamage = isNaN(value) || !value ? 1 : value;
        setComboDamage(parsedDamage);
    }

    const handleNoteChange = ({ target: { value } }) => {
        setComboNote(value);
    }

    return (
        <div className='extras-view'>
            <div className='extras-view__damage'>
                <label>Damage</label>
                <input
                    value={comboDamage}
                    onChange={handleDamageChange}
                    onBlur={handleDamageBlur}
                />
            </div>
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