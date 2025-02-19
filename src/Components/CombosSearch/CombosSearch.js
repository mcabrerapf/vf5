import React, { useEffect, useRef, useState } from 'react';
import './CombosSearch.scss'
import { getAllCombos } from '../../services/aws';
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
    const [selectedSort, setSelectedSort] = useState(COMBOS_SORT_OPTIONS[0]);
    const [comboResults, setComboResults] = useState([]);
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

            await getAllCombos({
                characterId: selectedCharacter,
                lIds,
                oIds
            })
                .then(res => {

                    setLocalCombos(newLocalCombos);
                    setIsLoading(false);
                    setComboResults(res);
                })
                .catch(() => {
                    setIsLoading(false);
                    setComboResults([]);
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
        await getAllCombos({
            characterId: selectedCharacter,
            characterFilters: newFilters,
            lIds,
            oIds
        })
            .then(res => {
                setIsLoading(false);
                setComboResults(res);
                setSelectedFilters(newFilters);
            })
            .catch(() => {
                setIsLoading(false);
                setComboResults([]);
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

    const sortedResults = sortList(comboResults, selectedSort);

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
                        modifier={'active'}
                    >
                        Combos ({comboResults.length || 0})
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
                        const disabledSaveButton = !!localCombos.find(lCombo => lCombo.oId === combo.id);
                        return (
                            <Combo
                                combo={{ ...combo, favourite: false }}
                                showSaveButton
                                hideEditButton
                                hideFavouriteButton
                                showLikes
                                disabledSaveButton={disabledSaveButton}
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