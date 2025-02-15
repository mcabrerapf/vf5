import React, { useEffect, useRef, useState } from 'react';
import './Hamburger.scss';
import Button from '../Button';
import { STRINGS } from '../../constants';

const Hamburger = ({
    characterView,
    handleViewChange,
    toggleInfoModal
}) => {
    const backgroundRef = useRef(null);
    const optionsRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside({ target }) {
            const shouldCloseMenu = optionsRef.current && !optionsRef.current.contains(target);
            if (shouldCloseMenu) setIsOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionsRef]);

    const handleOptionClick = (newView) => {
        toggleMenu();
        handleViewChange(newView);
    };

    const handleInfoClick = () => {
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
                <div
                    ref={backgroundRef}
                    className="hamburger__container"
                >
                    <div
                        ref={optionsRef}
                        className="hamburger__container__options"
                    >
                        <div
                            className={`hamburger__container__options__option${characterView === STRINGS.MOVELIST ? ' selected' : ''}`}
                            onClick={() => handleOptionClick(STRINGS.MOVELIST)}
                        >
                            Movelist
                        </div>
                        <div
                            className={`hamburger__container__options__option${characterView === STRINGS.COMBOS ? ' selected' : ''}`}
                            onClick={() => handleOptionClick(STRINGS.COMBOS)}
                        >
                            Combos
                        </div>
                        <div
                            className={`hamburger__container__options__option${characterView === STRINGS.NOTES ? ' selected' : ''}`}
                            onClick={() => handleOptionClick(STRINGS.NOTES)}
                        >
                            Notes
                        </div>
                        <div
                            className={`hamburger__container__options__option${characterView === STRINGS.MATCHUPS ? ' selected' : ''}`}
                            onClick={() => handleOptionClick(STRINGS.MATCHUPS)}
                        >
                            Matchups
                        </div>
                        <div
                            className="hamburger__container__options__option"
                            onClick={handleInfoClick}
                        >
                            Info
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hamburger;
