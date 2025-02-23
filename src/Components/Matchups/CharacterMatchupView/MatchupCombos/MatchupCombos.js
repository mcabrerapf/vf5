import './MatchupCombos.scss'
import React from 'react'
import Combo from '../../../Combo';
import { CHARACTERS_JSON } from '../../../../constants';

const MatchupCombos = ({
    selectedCharacter,
    combosByLauncher,
    showSimpleView
}) => {
    const {
        combos_filter_options: combosFilterOptions,
    } = CHARACTERS_JSON[selectedCharacter];


    return (
        <div
            className='matchup-combos'
        >
            <div
                className='matchup-combos__list'
            >
                {Object.keys(combosByLauncher).map(key => {
                    return combosByLauncher[key].map(combo => {

                        return (
                            <div
                                key={combo.id}
                                className={`matchup-combos__list__combo${combo.favourite ? ' favourite' : ''}`}
                            >
                                <Combo
                                    showSimpleView={showSimpleView}
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