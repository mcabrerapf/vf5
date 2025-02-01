import React, { useEffect, useState } from 'react';
import './Combos.scss'
import { LOCAL_KEYS } from '../../constants';
import { useMainContext } from '../../Contexts/MainContext';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import ComboBuilderModal from '../Modals/ComboBuilderModal';

const Combos = () => {
    const { selectedCharacter } = useMainContext();
    const [combos, setCombos] = useState([]);
    const [selectedComboIndex, setSelectedComboIndex] = useState(null);
    const [showComboBuilderModal, setShowComboBuilderModal] = useState(false);
    const localComboKey = `${LOCAL_KEYS.CHARACTER_COMBOS}${selectedCharacter}`;

    useEffect(
        () => {
            const localCombos = localStorage.getItem(localComboKey);
            const parsedCombos = JSON.parse(localCombos) || [];
            setCombos(parsedCombos);
        },
        [localComboKey]
    )

    const handleCloseModal = (newCombo) => {
        if (newCombo) {
            if (selectedComboIndex === null) {
                const updatedCombos = [...combos.map(combo => combo), newCombo];
                const stringifiedCombos = JSON.stringify(updatedCombos);
                localStorage.setItem(localComboKey, stringifiedCombos);
                setCombos(updatedCombos);
            } else {
                const updatedCombos = combos.map((combo, index) => {
                    if (index === selectedComboIndex) return newCombo;
                    return combo;
                });
                const stringifiedCombos = JSON.stringify(updatedCombos);
                localStorage.setItem(localComboKey, stringifiedCombos);
                setCombos(updatedCombos);
            }
        }
        toggleComboBuilderModal();
    }

    const handleComboClick = (index) => {
        setSelectedComboIndex(index);
        toggleComboBuilderModal();
    }

    const handleNewComboClick = () => {
        setSelectedComboIndex(null);
        toggleComboBuilderModal();
    }

    const toggleComboBuilderModal = () => {
        setShowComboBuilderModal(!showComboBuilderModal);
    }


    const handleDeleteCombo = (comboIndex) => {
        const updatedCombos = combos.filter((_, index) => index !== comboIndex);
        const stringifiedCombos = JSON.stringify(updatedCombos)
        localStorage.setItem(localComboKey, stringifiedCombos);
        setCombos(updatedCombos);
    }

    const selectedCombo = combos[selectedComboIndex];

    return (
        <div className='combos'>
            <ModalContextWrapper
                showModal={showComboBuilderModal}
                closeModal={handleCloseModal}
            >
                <Modal>
                    <ComboBuilderModal selectedCombo={selectedCombo} />
                </Modal>
            </ModalContextWrapper>
            <div className='combos__list-container'>
                <ul
                    className='combos__list-container__list'
                >
                    {combos.map((combo, i) =>
                        <li
                            key={`${combo.join('')}-${i}`}
                            className='combos__list-container__list__combo'
                        >
                            <MoveCommand
                                command={combo}
                                onClick={() => handleComboClick(i)}
                            />
                            <Button
                                modifier="no-border"
                                text="X"
                                onClick={() => handleDeleteCombo(i)}
                            />
                        </li>
                    )}
                </ul>
            </div>
            <footer className='combos__footer'>
                <Button
                    text={"+"}
                    onClick={handleNewComboClick}
                />
            </footer>
        </div>
    )
}

export default Combos;