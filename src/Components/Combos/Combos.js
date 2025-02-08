import React, { useEffect, useState } from 'react';
import './Combos.scss'
import { SELECTED_COMBOS_FILTERS_KEY, CHARACTERS_DATA_KEY, STRINGS, COMBO_FILTER_OPTIONS, COMBOS_SORT_OPTIONS, SELECTED_COMBOS_SORT_KEY } from '../../constants';
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
import SortModal from '../Modals/SortModal';

const Combos = () => {
    const { selectedCharacter,listView } = useMainContext();
    const localFilters = getFromLocal(SELECTED_COMBOS_FILTERS_KEY);
    const localSelectedSort = getFromLocal(SELECTED_COMBOS_SORT_KEY);

    const [combos, setCombos] = useState(null);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(localFilters);
    const [showComboBuilderModal, setShowComboBuilderModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSort, setSelectedSort] = useState(localSelectedSort);
    const [showSortModal, setShowSortModal] = useState(false);

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
    
    if(!combos) return null;

    const handleFiltersChange = (newFilters) => {
        if (newFilters) {
            setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, JSON.stringify(newFilters));
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
            const updatedFilters = selectedFilters.filter(filter => filter.prefix !== 'character');
            setLocalStorage(SELECTED_COMBOS_FILTERS_KEY, JSON.stringify(updatedFilters));
            setSelectedFilters(updatedFilters);
        } else {
            if (selectedFilters.find(sFilter => sFilter.name === value)) return;
            const newFilter = COMBO_FILTER_OPTIONS.find(option => option.id === value.toLocaleLowerCase());
            const updatedFilters = [...selectedFilters.map(filter => filter), newFilter];
            handleFiltersChange(updatedFilters);
        }

    }

    const handleTagClick = ({ target: { value } }) => {
        if (selectedFilters.find(sFilter => sFilter.id === value)) return;
        const newFilter = COMBO_FILTER_OPTIONS.find(option => option.id === value);
        const updatedFilters = [...selectedFilters.map(filter => filter), newFilter];
        handleFiltersChange(updatedFilters);
    }

    const handleFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        handleFiltersChange(newFilters);
    }

    const handleLauncherClick = ({ target: { value } }) => {
        if (!value || selectedFilters.find(sFilter => sFilter.id === value.join('-'))) return;
        const stringLauncher = value.join('-');
        const newFilters = [
            ...selectedFilters,
            { id: stringLauncher, name: stringLauncher, prefix: 'launcher' }

        ]
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

    const handleSortClick = () => {
        const newSort = {
            ...selectedSort,
            dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        setLocalStorage(SELECTED_COMBOS_SORT_KEY, JSON.stringify(newSort));
        setSelectedSort(newSort);
    }

    const handleSortModalClose = (sort) => {
        handleSortChange(sort)
        toggleSortModal();
    }

    const handleSortChange = (sort) => {
        if (!sort) return;
        setLocalStorage(SELECTED_COMBOS_SORT_KEY, JSON.stringify(sort));
        setSelectedSort(sort);
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal);
    }

    const filteredCombos = filterCombos(combos, selectedFilters);
    const sortedCombos = sortCombos(filteredCombos, selectedSort);
    const showSimpleView = listView ==='S';

    return (
        <div className='combos'>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <Modal>
                    <SortModal
                        selectedSort={selectedSort}
                        sortOptions={COMBOS_SORT_OPTIONS}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showComboBuilderModal}
                closeModal={handleCloseModal}
            >
                <Modal>
                    <ComboBuilderModal
                        selectedCombo={selectedCombo}
                        combos={combos}
                        handleDeleteClick={handleDeleteClick}
                    />
                </Modal>
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showDeleteModal}
                closeModal={handleDeleteCombo}
            >
                <Modal>
                    <DeleteModal
                        data={selectedCombo}
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
                selectedSort={selectedSort}
                onSortClick={toggleSortModal}
                onSortDirClick={handleSortClick}
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
                                selectedSort={selectedSort}
                                handleSortChange={handleSortChange}
                                showSimpleView={showSimpleView}
                                onClick={() => handleComboClick(combo)}
                                onLauncherClick={handleLauncherClick}
                                onFavouriteClick={onFavouriteClick}
                                onTagClick={handleTagClick}
                                onCharacterClick={handleCharacterClick}
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