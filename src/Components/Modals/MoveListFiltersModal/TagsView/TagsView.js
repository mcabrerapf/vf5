import React from 'react';
import './TagsView.scss'
import MoveTypeBadge from '../../../MoveTypeBadge';
import { MOVE_LEVEL_MATCH } from '../../../../constants';

const TagsView = ({
    selectedTypeFilters,
    handleButtonClick,
    handleTypeClick,
    handleFavoriteClick
}) => {
    const typeOptions = Object.keys(MOVE_LEVEL_MATCH).map(key => MOVE_LEVEL_MATCH[key]);

    const isFavSelected = selectedTypeFilters.includes(`fav/`);
    const favModifier = isFavSelected ? 'selected' : 'not-selected';

    return (
        <div className='tags-view'>
            <div className='tags-view__types'>
                {typeOptions.map(typeOption => {
                    const isSelected = selectedTypeFilters.includes(`level/${typeOption}`);
                    const modifier = isSelected ? 'selected' : 'not-selected';

                    return (
                        <MoveTypeBadge
                            key={typeOption}
                            modifier={modifier}
                            moveType={typeOption}
                            onClick={handleTypeClick}
                        />
                    )
                })}
                <MoveTypeBadge
                    modifier={favModifier}
                    moveType={'favorite'}
                    onClick={handleFavoriteClick}
                />
            </div>
        </div>
    )
}

export default TagsView;