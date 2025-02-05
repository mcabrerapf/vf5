import React, { useEffect, useState } from 'react';
import './Combos.scss'
import { SELECTED_COMBOS_FILTERS_KEY, CHARACTERS_DATA_KEY, STRINGS } from '../../constants';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Button from '../Button';
import Modal from '../Modals/Modal';
import ComboBuilderModal from '../Modals/ComboBuilderModal';
import DeleteModal from '../Modals/DeleteModal';
import Combo from '../Combo';
import CombosHeader from './CombosHeader';
import ActiveFiltersList from '../ActiveFiltersList';
import { generateId, getFromLocal, setLocalStorage } from '../../helpers';
import { filterCombos, sortCombos } from './helpers';

const Combos = () => {
    const { selectedCharacter } = useMainContext();
    const localFilters = getFromLocal(SELECTED_COMBOS_FILTERS_KEY);
    const [combos, setCombos] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [showComboBuilderModal, setShowComboBuilderModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(
        () => {
            const localCombos = getFromLocal(
                CHARACTERS_DATA_KEY,
                selectedCharacter,
                STRINGS.COMBOS
            );
            setCombos(localCombos);
        },
        [selectedCharacter]
    )

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, newFilters);
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
                CHARACTERS_DATA_KEY,
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


    const handleDeleteCombo = (shouldDelete) => {
        if (shouldDelete) {
            const updatedCombos = combos.filter((combo) => combo.id !== selectedCombo.id);

            setLocalStorage(
                CHARACTERS_DATA_KEY,
                updatedCombos,
                selectedCharacter,
                STRINGS.COMBOS
            );
            setCombos(updatedCombos);
        }
        setSelectedCombo(null);
        toggleDeleteModal();
    }

    const handleDeleteClick = (combo) => {
        setSelectedCombo(combo);
        toggleDeleteModal()
    }

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const handleCharacterClick = ({ target: { value } }) => {
        if (value === 'ALL') {
            const updatedFilters = selectedFilters.filter(filter => !filter.includes('character/'));
            setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, updatedFilters);
            setSelectedFilters(updatedFilters);
        } else {
            const parsedValue = `character/${value}`
            if (selectedFilters.includes(parsedValue)) return;
            const updatedFilters = [...selectedFilters.map(filter => filter), parsedValue];
            setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, updatedFilters);
            setSelectedFilters(updatedFilters);
        }

    }

    const handleTagClick = ({ target: { value } }) => {
        const parsedValue = `other/${value}`
        if (selectedFilters.includes(parsedValue)) return;
        const updatedFilters = [...selectedFilters.map(filter => filter), parsedValue];
        setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, updatedFilters);
        setSelectedFilters(updatedFilters);
    }

    const handleFilterClick = ({ target: { value } }) => {
        const newFilters = selectedFilters.filter(filter => filter !== value);
        handleFiltersChange(newFilters);
    }

    const handleLauncherClick = ({ target: { value } }) => {
        if (!value) return;
        const stringLauncher = `launcher/${value.join('')}`;
        const newFilters = [...new Set([...selectedFilters, stringLauncher])];
        handleFiltersChange(newFilters);

    }

    const onFavouriteClick = (comboId) => {
        const updatedCombos = combos.map(combo => {
            if (combo.id === comboId) combo.favourite = !combo.favourite;
            return combo;
        })
        setLocalStorage(
            CHARACTERS_DATA_KEY,
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
            <ModalContextWrapper
                showModal={showDeleteModal}
                closeModal={handleDeleteCombo}
            >
                <Modal>
                    <DeleteModal
                        combo={selectedCombo}
                    />
                </Modal>
            </ModalContextWrapper>
            <CombosHeader
                combos={combos}
                selectedFilters={selectedFilters}
                handleFiltersChange={handleFiltersChange}
            />
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                onFilterClick={handleFilterClick}
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
                                onLauncherClick={handleLauncherClick}
                                onFavouriteClick={onFavouriteClick}
                                onTagClick={handleTagClick}
                                onCharacterClick={handleCharacterClick}
                            />
                            <Button
                                modifier="no-border"
                                text="X"
                                onClick={() => handleDeleteClick(combo)}
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