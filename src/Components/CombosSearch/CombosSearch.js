import React, { useEffect, useState } from 'react';
import './CombosSearch.scss'
import Button from '../Button';
import { SearchIcon } from '../Icon';
import { getAllCombos } from '../../services/aws';
import { useMainContext } from '../../Contexts/MainContext';
import Combo from '../Combo/Combo';
import { CHARACTERS_JSON } from '../../constants';
import { updateCombos } from '../../services';
import { validateCombo } from '../../services/utils';

const CombosSearch = () => {
    const { selectedCharacter } = useMainContext();
    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];

    const [comboResults, setComboResults] = useState([]);

    useEffect(() => {
        async function fetchCombos() {
            const results = await getAllCombos({
                characterId: selectedCharacter
            });

            setComboResults(results);
        }
        fetchCombos();
    }, [selectedCharacter])


    const onSaveButtonClick = (combo) => {
        const validatedCombo = validateCombo(combo);
        delete validatedCombo.id;
        updateCombos(selectedCharacter, validatedCombo);
    }

    const characterFilterOptions = combosFilterOptions
        .filter(option => option.key === 'character_tags')


    return (
        <div
            className='combos-search'
        >
            <div>
                <Button
                >
                    <SearchIcon />
                </Button>
            </div>
            {!!comboResults.length &&
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