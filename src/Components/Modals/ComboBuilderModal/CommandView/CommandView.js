import React from 'react';
import './CommandView.scss';
import CommandBuilder from '../../../CommandBuilder';
import Button from '../../../Button';

const CommandView = ({
    comboDamage,
    comboNotation,
    isFavourite,
    setFavourite,
    setComboNotation,
    setComboDamage,
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

    return (
        <div
            className='command-view'
        >
            <div className='command-view__top'>
                <div className='command-view__top__damage'>
                    <label>Damage</label>
                    <input
                        type='number'
                        value={comboDamage}
                        onFocus={() => setComboDamage('')}
                        onChange={handleDamageChange}
                        onBlur={handleDamageBlur}
                    />
                </div>
                <div>
                    <Button
                        modifier={isFavourite ? 'favourite' : ""}
                        onClick={setFavourite}
                        text="★"
                    />
                </div>
            </div>
            <div className='command-view__bottom'>
                <CommandBuilder
                    command={comboNotation}
                    setCommand={setComboNotation}
                />
            </div>
        </div>
    )
}

export default CommandView;