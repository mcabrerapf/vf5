import React, { useEffect, useState } from 'react';
import './CombosSearch.scss'
import { getAllCombos } from '../../services/aws';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import Combo from '../Combo';
import Button from '../Button';
import CombosSearchFiltersModal from '../Modals/CombosSearchFiltersModal';
import { CHARACTERS_JSON, STRINGS } from '../../constants';
import { getCombos, updateCombos } from '../../services';
import { validateCombo } from '../../services/utils';
import { generateId } from '../../helpers';
import ActiveFiltersList from '../ActiveFiltersList';

const CombosSearch = ({
    handleViewChange
}) => {
    const { selectedCharacter, listView } = useMainContext();
    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];
    const initialLocalCombos = getCombos(selectedCharacter);

    const [comboResults, setComboResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [localCombos, setLocalCombos] = useState(initialLocalCombos);

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

    const characterFilterOptions = combosFilterOptions
        .filter(option => option.key === 'character_tags')


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
            <div
                className='combos-search__header'
            >
                <div
                    className='combos-search__header__left'
                >
                    <Button
                        onClick={() => handleViewChange(STRINGS.COMBOS)}
                    >
                        BACK
                    </Button>
                    {!isLoading &&
                        <Button
                            modifier={'active'}
                        >
                            Combos ({comboResults.length || 0})
                        </Button>
                    }
                </div>

                <Button
                    modifier={selectedFilters.length ? 'active' : ''}
                    text={'Filters'}
                    onClick={() => setShowFiltersModal(true)}
                />

            </div>
            <ActiveFiltersList
                selectedFilters={selectedFilters}
                selectedSort={{}}
            // onSortClick={toggleSortModal}
            // onSortDirClick={handleSortDirChange}
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
                    className='combos-search__results'
                >
                    {comboResults.map(combo => {
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
        </div>
    )
}

export default CombosSearch;