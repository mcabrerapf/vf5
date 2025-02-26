import React, { useRef } from 'react';
import './CommandView.scss';
import CommandBuilder from '../../../CommandBuilder';
import Button from '../../../Button';

const CommandView = ({
    comboDamage,
    comboName,
    comboNotation,
    isFavourite,
    setFavourite,
    setComboNotation,
    setComboDamage,
    setComboName,
    isDownloaded
}) => {
    const nameInputRef = useRef();
    const damageInputRef = useRef();

    const handleDamageChange = ({ target: { value } }) => {
        const parsedDamage = isNaN(value) ? 1 : value;
        const maxChecked = Number(parsedDamage) > 999 ? 999 : parsedDamage;
        setComboDamage(maxChecked);
    }

    const handleDamageBlur = ({ target: { value } }) => {
        const parsedDamage = isNaN(value) || !value || value < 1 ? 1 : value;
        setComboDamage(parsedDamage);
    }

    const handleNameEnterKey = (event) => {
        if (event.key === "Enter") {
            if (event.target.className.includes('name-input')) {
                nameInputRef.current.blur();
            }
            if (event.target.className.includes('damage-input')) {
                damageInputRef.current.blur();
            }
        }
    };

    return (
        <div
            className='command-view'
        >
            <div className='command-view__top'>
                <div className='command-view__top__inputs'>
                    <input
                        ref={nameInputRef}
                        className='command-view__top__inputs__name name-input'
                        value={comboName}
                        onKeyDown={handleNameEnterKey}
                        onChange={({ target: { value } }) => setComboName(value)}
                    />
                    <input
                        ref={damageInputRef}
                        disabled={isDownloaded}
                        className='command-view__top__inputs__damage damage-input'
                        type='number'
                        value={comboDamage}
                        onKeyDown={handleNameEnterKey}
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
                        disableButtons={isDownloaded}
                        showFromButton
                    />
                
            </div>
        </div>
    )
}

export default CommandView;