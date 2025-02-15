import React, { useState } from 'react';
import './Hamburger.scss';
import Button from '../Button';
import { STRINGS } from '../../constants';

const Hamburger = ({
    handleViewChange,
    toggleInfoModal
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (newView) => {
        toggleMenu();
        handleViewChange(newView);
    };

    const handleInfoClick =()=> {
        toggleMenu();
        toggleInfoModal();
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="hamburger">
            <Button onClick={toggleMenu}>
                {isOpen ? '✖' : '☰'}
            </Button>

            {isOpen && (
                <div className="hamburger__options">
                    <div
                        className="hamburger__options__option"
                        onClick={() => handleOptionClick(STRINGS.MOVELIST)}
                    >
                        Movelist
                    </div>
                    <div
                        className="hamburger__options__option"
                        onClick={() => handleOptionClick(STRINGS.COMBOS)}
                    >
                        Combos
                    </div>
                    <div
                        className="hamburger__options__option"
                        onClick={() => handleOptionClick(STRINGS.NOTES)}
                    >
                        Notes
                    </div>
                    <div
                        className="hamburger__options__option"
                        onClick={() => handleOptionClick(STRINGS.MATCHUPS)}
                    >
                        Matchups
                    </div>
                    <div
                        className="hamburger__options__option"
                        onClick={handleInfoClick}
                    >
                        Info
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hamburger;
