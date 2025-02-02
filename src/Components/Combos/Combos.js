import React, { useEffect, useState } from 'react';
import './Combos.scss'
import { LOCAL_KEYS } from '../../constants';
import { useMainContext } from '../../Contexts/MainContext';
import Button from '../Button';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Modal from '../Modals/Modal';
import ComboBuilderModal from '../Modals/ComboBuilderModal';
import Combo from '../Combo/Combo';
import { generateId, getFromLocal } from '../../helpers';
import setLocalStorage from '../../helpers/setLocalStorage';
import { sortCombos } from './helpers';

const Combos = () => {
    const { selectedCharacter } = useMainContext();
    const [combos, setCombos] = useState([]);
    const [selectedComboIndex, setSelectedComboIndex] = useState(null);
    const [showComboBuilderModal, setShowComboBuilderModal] = useState(false);
    const localComboKey = `${LOCAL_KEYS.CHARACTER_COMBOS}${selectedCharacter}`;

    useEffect(
        () => {
            const localCombos = getFromLocal(localComboKey)
            setCombos(localCombos);
        },
        [localComboKey]
    )

    const handleCloseModal = (newCombo) => {
        if (newCombo) {
            if (!newCombo.id) {
                const updatedCombos = [
                    ...combos.map(combo => combo),
                    { ...newCombo, id: generateId() }
                ];
                const stringifiedCombos = JSON.stringify(updatedCombos);
                setLocalStorage(localComboKey, stringifiedCombos);
                setCombos(updatedCombos);
            } else {
                const updatedCombos = combos.map((combo) => {
                    if (combo.id === newCombo.id) return newCombo;
                    return combo;
                });
                const stringifiedCombos = JSON.stringify(updatedCombos);
                setLocalStorage(localComboKey, stringifiedCombos);
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
        setLocalStorage(localComboKey, stringifiedCombos);
        setCombos(updatedCombos);
    }
    const sortedCombos = sortCombos(combos);
    const selectedCombo = sortedCombos[selectedComboIndex];

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
                    {sortedCombos.map((combo, i) =>
                        <li
                            key={combo.id}
                            className='combos__list-container__list__combo'
                        >
                            <Combo
                                combo={combo}
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