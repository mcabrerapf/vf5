import React, { useEffect, useState } from 'react';
import './CombosSearch.scss'
import { getAllCombos } from '../../services/aws';
import { useMainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';
import { SearchIcon } from '../Icon';
import Combo from '../Combo';
import Button from '../Button';
import Modal from '../Modals/Modal';
import CombosSearchFiltersModal from '../Modals/CombosSearchFiltersModal';
import { CHARACTERS_JSON, STRINGS } from '../../constants';
import { updateCombos } from '../../services';
import { validateCombo } from '../../services/utils';
import { generateId } from '../../helpers';
// import ActiveFiltersList from '../ActiveFiltersList';

const CombosSearch = ({
    handleViewChange
}) => {
    const { selectedCharacter, listView } = useMainContext();
    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];

    const [comboResults, setComboResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        async function fetchCombos() {
            setIsLoading(true);
            const results = await getAllCombos({
                characterId: selectedCharacter
            });
            setIsLoading(false);
            setComboResults(results);
        }
        fetchCombos();
    }, [selectedCharacter])


    const onSaveButtonClick = (combo) => {
        const withId = { ...combo, oId: combo.id, id: generateId() };
        const validatedCombo = validateCombo(withId);
        updateCombos(selectedCharacter, validatedCombo);
    }

    const handleFiltersModalClose = async (newFilters) => {
        setShowFiltersModal(!showFiltersModal);
        setIsLoading(true);
        const results = await getAllCombos({
            characterId: selectedCharacter,
            characterFilters: newFilters
        });
        setIsLoading(false);
        setComboResults(results);
        setSelectedFilters(newFilters);
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
                <Modal>
                    <CombosSearchFiltersModal
                        selectedFilters={selectedFilters}
                        filterOptions={characterFilterOptions}
                    />
                </Modal>
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
                            Combos ({comboResults.length})
                        </Button>
                    }
                </div>

                <Button
                    onClick={() => setShowFiltersModal(true)}
                >
                    <SearchIcon />
                </Button>
            </div>
            {/* <ActiveFiltersList
                selectedFilters={[]}
                selectedSort={{}}
            // onSortClick={toggleSortModal}
            // onSortDirClick={handleSortDirChange}
            // onFilterClick={handleActiveFilterClick}
            /> */}
            {isLoading && <div>LOADING</div>}
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
                        return (
                            <Combo
                                combo={combo}
                                showSaveButton
                                hideEditButton
                                hideFavouriteButton
                                showSimpleView={listView === 'S'}
                                characterFilterOptions={characterFilterOptions}
                                combosFilterOptions={combosFilterOptions}
                                onSaveButtonClick={onSaveButtonClick}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default CombosSearch;