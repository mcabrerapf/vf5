import React, { useEffect, useRef, useState } from 'react';
import './CombosSearch.scss'
import { getAllOnlineCombos, getMyOnlineCombos } from '../../services/aws';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Combo from '../Combo';
import Button from '../Button';
import ActiveFiltersList from '../ActiveFiltersList';
import CombosFiltersModal from '../Modals/CombosFiltersModal';
import { CHARACTERS_JSON, COMBOS_SORT_OPTIONS, STRINGS } from '../../constants';
import { getCombos, updateCombos } from '../../services';
import { validateCombo } from '../../services/utils';
import { filterList, generateId, getLauncherData, sortList } from '../../helpers';
import SortModal from '../Modals/SortModal';
import { COMBO_SEARCH_SORT_OPTIONS } from './constants';
import { getUniqueComboName } from '../Modals/ComboBuilderModal/helpers';

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

            await getAllOnlineCombos({
                characterId: selectedCharacter,
                lIds,
            })
                .then(res => {
                    allCombos = res;
                    if (!lIds.length) return [];
                    return getMyOnlineCombos({
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

    const handleFiltersChange = (newFilters) => {
        if (!newFilters) return;
        scrollToTop();
        setSelectedFilters(newFilters);
    }

    const toggleSortModal = () => setShowSortModal(!showSortModal);

    const handleSortChange = (sort) => {
        if (!sort) return;
        scrollToTop();
        setSelectedSort(sort);
    }

    const onDownloadClick = (combo) => {
        const withId = { ...combo, oId: combo.id, id: generateId() };
        const { name: launcherName } = getLauncherData(withId.launcher, selectedCharacter);
        const uniquename = getUniqueComboName(withId.id, withId.name, launcherName, localCombos);
        const validatedCombo = validateCombo({ ...withId, name: uniquename });
        const [newCombos] = updateCombos(selectedCharacter, { ...validatedCombo, isDownloaded: true });
        setLocalCombos(newCombos)
    }

    const handleFiltersModalClose = async (newFilters) => {
        if (newFilters) {
            setSelectedFilters(newFilters);
            scrollToTop();
        }
        setShowFiltersModal(!showFiltersModal);

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

    const handleFilterClick = (filter) => {
        const newFilters = selectedFilters.filter(sFilter => sFilter.id !== filter.id);
        scrollToTop();
        handleFiltersChange(newFilters);
    }

    const handleTagClick = ({ target: { value } }) => {
        const newFilter = combosFilterOptions.find(option => option.value === value);
        const filteredFilters = selectedFilters.filter(sFilter => sFilter.value !== value)
        let updatedFilters;
        if (filteredFilters.length === selectedFilters.length) {
            updatedFilters = [...filteredFilters, newFilter];
        } else {
            updatedFilters = filteredFilters;
        }
        handleFiltersChange(updatedFilters);
    }

    const handleLauncherClick = ({ target: { value } }) => {
        if (!value || selectedFilters.find(sFilter => sFilter.id === value.join('-'))) return;
        const stringLauncher = value.join('-');
        const newFilters = [
            ...selectedFilters,
            { id: stringLauncher, name: stringLauncher, key: 'launcher' }

        ]
        handleFiltersChange(newFilters);
    }

    const characterFilterOptions = combosFilterOptions
        .filter(option => option.key === 'character_tags')

    const filteredResults = filterList(comboResults, selectedFilters);
    const filteredMyCombos = filterList(myCombos, selectedFilters);
    const combosToUse = selectedCombosSearchView === 'online' ? filteredResults : filteredMyCombos;
    const sortedResults = sortList(combosToUse, selectedSort);

    return (
        <div
            className='combos-search'
        >
            <ModalContextWrapper
                showModal={showFiltersModal}
                closeModal={handleFiltersModalClose}
            >
                <CombosFiltersModal
                    selectedFilters={selectedFilters}
                    filterOptions={combosFilterOptions}
                    listItems={sortedResults}
                />
            </ModalContextWrapper>
            <ModalContextWrapper
                showModal={showSortModal}
                closeModal={handleSortModalClose}
            >
                <SortModal
                    selectedSort={selectedSort}
                    sortOptions={COMBO_SEARCH_SORT_OPTIONS}
                />
            </ModalContextWrapper>
            <div
                className='combos-search__header'
            >
                <div
                    className='combos-search__header__left'
                >
                    <Button
                        disabled={isLoading}
                        modifier={selectedCombosSearchView === 'online' ? 'active' : ''}
                        onClick={() => setSelectedCombosSearchView(selectedCombosSearchView === 'online' ? 'mine' : 'online')}
                    >
                        Combos ({filteredResults.length || 0})
                    </Button>
                    <Button
                        disabled={isLoading}
                        modifier={selectedCombosSearchView !== 'online' ? 'active' : ''}
                        onClick={() => setSelectedCombosSearchView(selectedCombosSearchView === 'online' ? 'mine' : 'online')}
                    >
                        My Combos ({filteredMyCombos.length || 0})
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
                onFilterClick={handleFilterClick}
            />
            {isLoading &&
                <div
                    className='combos-search__loading'
                >
                    LOADING
                </div>
            }
            {!isLoading && !sortedResults.length &&
                <div
                    className='combos-search__no-results'
                >
                    No results...
                </div>
            }
            {!isLoading && !!sortedResults.length &&
                <div
                    ref={listRef}
                    className='combos-search__results'
                >
                    {sortedResults.map(combo => {
                        let disableDownloadButton = false;
                        let disableLikes = false;
                        localCombos.forEach(lCombo => {
                            if (lCombo.oId === combo.id) disableDownloadButton = true;
                            if (lCombo.id === combo.lId) disableLikes = true;
                        });

                        return (
                            <Combo
                                key={combo.id}
                                combo={combo}
                                showDownloadButton={selectedCombosSearchView === 'online'}
                                hideEditButton
                                hideFavouriteButton
                                showLikes
                                disableDownloadButton={disableDownloadButton}
                                disableLikes={disableLikes}
                                showSimpleView={listView === 'S'}
                                characterFilterOptions={characterFilterOptions}
                                combosFilterOptions={combosFilterOptions}
                                selectedFilters={selectedFilters}
                                selectedSort={selectedSort}
                                onDownloadClick={onDownloadClick}
                                handleSortChange={handleSortChange}
                                onLauncherClick={handleLauncherClick}
                                onTagClick={handleTagClick}
                                handleFiltersChange={handleFiltersChange}
                            />
                        )
                    })}
                    <div className='bottom-separator'>.</div>
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