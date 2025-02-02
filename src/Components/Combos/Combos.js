import React, { useEffect, useState } from 'react';
import './Combos.scss'
import { LOCAL_KEYS, STRINGS } from '../../constants';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Button from '../Button';
import Modal from '../Modals/Modal';
import ComboBuilderModal from '../Modals/ComboBuilderModal';
import Combo from '../Combo';
import CombosHeader from './CombosHeader';
import ActiveFiltersList from './ActiveFiltersList';
import { generateId, getFromLocal, setLocalStorage } from '../../helpers';
import { filterCombos, sortCombos } from './helpers';

const Combos = () => {
    const { selectedCharacter } = useMainContext();
    const localFilters = getFromLocal(LOCAL_KEYS.SELECTED_COMBOS_FILTERS);
    const [combos, setCombos] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [showComboBuilderModal, setShowComboBuilderModal] = useState(false);

    useEffect(
        () => {
            const localCombos = getFromLocal(
                LOCAL_KEYS.CHARACTERS_DATA,
                selectedCharacter,
                STRINGS.COMBOS
            );
            setCombos(localCombos);
        },
        [selectedCharacter]
    )

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(LOCAL_KEYS.SELECTED_COMBOS_FILTERS, newFilters);
            setSelectedFilters(newFilters);
        }

    }

    const handleCloseModal = (newCombo) => {
        if (newCombo) {
            let updatedCombos;
            if (!newCombo.id) {
                updatedCombos = [
                    ...combos.map(combo => combo),
                    { ...newCombo, id: generateId() }
                ];

            } else {
                updatedCombos = combos.map((combo) => {
                    if (combo.id === newCombo.id) return newCombo;
                    return combo;
                });
            }

            setLocalStorage(
                LOCAL_KEYS.CHARACTERS_DATA,
                updatedCombos,
                selectedCharacter,
                STRINGS.COMBOS
            );
            setCombos(updatedCombos);
        }
        toggleComboBuilderModal();
    }

    const handleComboClick = (combo) => {
        setSelectedCombo(combo);
        toggleComboBuilderModal();
    }

    const handleNewComboClick = () => {
        setSelectedCombo(null);
        toggleComboBuilderModal();
    }

    const toggleComboBuilderModal = () => {
        setShowComboBuilderModal(!showComboBuilderModal);
    }


    const handleDeleteCombo = (comboId) => {
        const updatedCombos = combos.filter((combo) => combo.id !== comboId);

        setLocalStorage(
            LOCAL_KEYS.CHARACTERS_DATA,
            updatedCombos,
            selectedCharacter,
            STRINGS.COMBOS
        );
        setCombos(updatedCombos);
    }
    const filteredCombos = filterCombos(combos, selectedFilters);
    const sortedCombos = sortCombos(filteredCombos);

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
            <CombosHeader
                selectedFilters={selectedFilters}
                handleFiltersChange={handleFiltersChange}
            />
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                handleFiltersChange={handleFiltersChange}
            />
            <div className='combos__list-container'>
                <ul
                    className='combos__list-container__list'
                >
                    {sortedCombos.map((combo) =>
                        <li
                            key={combo.id}
                            className='combos__list-container__list__combo'
                        >
                            <Combo
                                combo={combo}
                                onClick={() => handleComboClick(combo)}
                            />
                            <Button
                                modifier="no-border"
                                text="X"
                                onClick={() => handleDeleteCombo(combo.id)}
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