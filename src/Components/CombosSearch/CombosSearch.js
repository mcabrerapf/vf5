import React, { useEffect, useRef, useState } from 'react';
import './CombosSearch.scss'
import { getAllCombos, getMyCombos } from '../../services/aws';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Combo from '../Combo';
import Button from '../Button';
import ActiveFiltersList from '../ActiveFiltersList';
import CombosSearchFiltersModal from '../Modals/CombosSearchFiltersModal';
import { CHARACTERS_JSON, COMBOS_SORT_OPTIONS, STRINGS } from '../../constants';
import { getCombos, updateCombos } from '../../services';
import { validateCombo } from '../../services/utils';
import { generateId, sortList } from '../../helpers';
import SortModal from '../Modals/SortModal';

const CombosSearch = ({
    handleViewChange
}) => {
    const listRef = useRef(null);
    const { selectedCharacter, listView } = useMainContext();
    const initialLocalCombos = getCombos(selectedCharacter);
    const [selectedCombosSearchView, setSelectedCombosSearchView] = useState('online');
    const [selectedSort, setSelectedSort] = useState(COMBOS_SORT_OPTIONS[0]);
    const [comboResults, setComboResults] = useState([]);
    const [myCombos, setMyCombos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [localCombos, setLocalCombos] = useState(initialLocalCombos);

    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];
    const scrollToTop = () => {
        if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        async function fetchCombos() {
            setIsLoading(true);
            const newLocalCombos = getCombos(selectedCharacter);
            const lIds = [];
            const oIds = [];
            newLocalCombos.forEach(lCombo => {
                lIds.push(lCombo.id)
                oIds.push(lCombo.oId)
            });
            let allCombos;

            await getAllCombos({
                characterId: selectedCharacter,
                lIds,
                oIds
            })
                .then(res => {
                    allCombos = res;
                    return getMyCombos({
                        characterId: selectedCharacter,
                        lIds,
                    })
                })
                .then(res => {
                    setLocalCombos(newLocalCombos);
                    setIsLoading(false);
                    setComboResults(allCombos);
                    setMyCombos(res);
                })
                .catch(() => {
                    setLocalCombos(newLocalCombos);
                    setIsLoading(false);
                    setComboResults([]);
                    setMyCombos([]);
                });

        }
        fetchCombos();
    }, [selectedCharacter])

    const toggleSortModal = () => setShowSortModal(!showSortModal);

    const onSaveButtonClick = (combo) => {
        const withId = { ...combo, oId: combo.id, id: generateId() };
        const validatedCombo = validateCombo(withId);
        const [newCombos] = updateCombos(selectedCharacter, validatedCombo);
        setLocalCombos(newCombos)
    }

    const handleFiltersModalClose = async (newFilters) => {
        if (!newFilters) return;
        setShowFiltersModal(!showFiltersModal);
        setIsLoading(true);
        const lIds = [];
        const oIds = [];
        localCombos.forEach(lCombo => {
            lIds.push(lCombo.id)
            oIds.push(lCombo.oId)
        });
        let allCombos;
        await getAllCombos({
            characterId: selectedCharacter,
            // characterFilters: newFilters,
            lIds,
            oIds
        })
            .then(res => {
                allCombos = res;
                return getMyCombos({
                    characterId: selectedCharacter,
                    // characterFilters: newFilters,
                    lIds,
                })
            })
            .then(res => {
                setIsLoading(false);
                setComboResults(allCombos);
                setMyCombos(res);
                setSelectedFilters(newFilters);
            })
            .catch(() => {
                setIsLoading(false);
                setComboResults([]);
                setMyCombos(false);
                setSelectedFilters(newFilters);
            });

    }

    const handleSortClick = () => {
        const newSort = {
            ...selectedSort,
            dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc'
        }
        setSelectedSort(newSort);
    }

    const handleSortModalClose = (sort) => {
        if (!sort) return toggleSortModal();
        scrollToTop();
        setSelectedSort(sort);
        toggleSortModal();
    }

    const characterFilterOptions = combosFilterOptions
        .filter(option => option.key === 'character_tags')
    const combosToUse = selectedCombosSearchView === 'online' ? comboResults : myCombos;
    const sortedResults = sortList(combosToUse, selectedSort);

    return (
        <div
            className='combos-search'
        >
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <CombosSearchFiltersModal
                    selectedFilters={selectedFilters}
                    filterOptions={characterFilterOptions}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <SortModal
                    selectedSort={selectedSort}
                    sortOptions={COMBOS_SORT_OPTIONS}
                />
            </ModalContextWrapper>
            <div
                className='combos-search__header'
            >
                <div
                    className='combos-search__header__left'
                >
                    <Button
                        modifier={selectedCombosSearchView === 'online' ? 'active' : ''}
                        onClick={() => setSelectedCombosSearchView('online')}
                    >
                        Combos ({comboResults.length || 0})
                    </Button>
                    <Button
                        modifier={selectedCombosSearchView === 'mine' ? 'active' : ''}
                        onClick={() => setSelectedCombosSearchView('mine')}
                    >
                        My Combos ({myCombos.length || 0})
                    </Button>
                </div>

                <Button
                    modifier={selectedFilters.length ? 'active' : ''}
                    text={'Filters'}
                    onClick={() => setShowFiltersModal(true)}
                />

            </div>
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                selectedSort={selectedSort}
                onSortClick={toggleSortModal}
                onSortDirClick={handleSortClick}
            // onFilterClick={handleActiveFilterClick}
            />
            {isLoading &&
                <div
                    className='combos-search__loading'
                >
                    LOADING
                </div>
            }
            {!isLoading && !comboResults.length &&
                <div
                    className='combos-search__no-results'
                >
                    No results...
                </div>
            }
            {!isLoading && !!comboResults.length &&
                <div
                    ref={listRef}
                    className='combos-search__results'
                >
                    {sortedResults.map(combo => {
                        console.log(combo)
                        console.log(localCombos)
                        const disableSaveButton = !!localCombos.find(lCombo => lCombo.oId === combo.id);
                        const disableLikes = !!localCombos.find(lCombo => lCombo.id === combo.lId);
                        return (
                            <Combo
                                combo={{ ...combo, favourite: false }}
                                showSaveButton
                                hideEditButton
                                hideFavouriteButton
                                showLikes
                                disableSaveButton={disableSaveButton}
                                disableLikes={disableLikes}
                                showSimpleView={listView === 'S'}
                                characterFilterOptions={characterFilterOptions}
                                combosFilterOptions={combosFilterOptions}
                                onSaveButtonClick={onSaveButtonClick}
                            />
                        )
                    })}
                    <div className='bottom-separator s'>.</div>
                </div>
            }
            <footer className='combos-search__footer'>
                <div className='combos-search__footer__empty'></div>
                <div className='combos-search__footer__empty'></div>
                <Button
                    modifier={'online-search-button'}
                    onClick={() => handleViewChange(STRINGS.COMBOS)}
                >
                    BACK
                </Button>
            </footer>
        </div>
    )
}

export default CombosSearch;