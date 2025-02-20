import './MatchupCombos.scss'
import React, { useState } from 'react'
import Button from '../../../Button'
import { ChevronDown, ChevronUp } from '../../../Icon';
import Combo from '../../../Combo';
import { getCombos } from '../../../../services';
import { CHARACTERS_JSON } from '../../../../constants';
import { sortList } from '../../../../helpers';

const MatchupCombos = ({
    selectedCharacter,
    matchupId
}) => {
    const [showCombos, setShowCombos] = useState(true);
    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];

    const combos = getCombos(selectedCharacter);
    const matchupCombos = combos
        .filter(combo => !!combo.character_tags.includes(matchupId))
    const combosByLauncher = {};
    [...matchupCombos]
        .sort((a, b) => a.launcher.length - b.launcher.length)
        .forEach(combo => {
            const stringLauncher = combo.launcher.join('-');
            if (!combosByLauncher[stringLauncher]) {
                combosByLauncher[stringLauncher] = [combo];
            } else {
                combosByLauncher[stringLauncher].push(combo);
            }
        });

    Object.keys(combosByLauncher).forEach(key => {
        combosByLauncher[key] = sortList(combosByLauncher[key], {
            key: 'launcher',
            dir: 'dsc',
            type: "array",
        })
    })
    const hasNoCombos = !Object.keys(combosByLauncher)?.length;

    return (
        <div
            className='matchup-combos'
        >
            <div
                className='matchup-combos__header'
            >
                <Button
                    disabled={hasNoCombos}
                    modifier={'active center'}
                    onClick={() => setShowCombos(!showCombos)}
                >
                    <span>COMBOS</span>
                    {showCombos ? <ChevronDown /> : <ChevronUp />}
                </Button>
            </div>
            <div
                className='matchup-combos__list'
            >
                {showCombos && Object.keys(combosByLauncher).map(key => {
                    return combosByLauncher[key].map(combo => {

                        return (
                            <div
                                key={combo.id}
                                className={`matchup-combos__list__combo${combo.favourite ? ' favourite' : ''}`}
                            >
                                <Combo
                                    showSimpleView
                                    hideEditButton
                                    hideFavouriteButton
                                    showOtherTags
                                    combo={combo}
                                    combosFilterOptions={combosFilterOptions}
                                />
                            </div>
                        )
                    })
                })}
                <div className='bottom-separator'>.</div>
            </div>
        </div>
    )

}

export default MatchupCombos;