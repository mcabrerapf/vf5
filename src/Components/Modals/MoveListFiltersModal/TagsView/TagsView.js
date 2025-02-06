import React from 'react';
import './TagsView.scss'
import MoveTypeBadge from '../../../MoveTypeBadge';
import { MOVELIST_FILTER_OPTIONS } from '../../../../constants';

const TagsView = ({
    selectedTypeFilters,
    handleFilterClick,
    handleFavoriteClick
}) => {

    const isFavSelected = selectedTypeFilters.find(filter => filter.id === 'fav');
    const favModifier = isFavSelected ? 'favourite' : 'not-selected';

    return (
        <div className='tags-view'>
            <div className='tags-view__types'>
                {MOVELIST_FILTER_OPTIONS.map(filterOption => {
                    const isSelected = selectedTypeFilters.find(selected => selected.id === filterOption.id);
                    const modifier = isSelected ? filterOption.id : 'not-selected';

                    return (
                        <MoveTypeBadge
                            key={filterOption.id}
                            modifier={modifier}
                            value={filterOption.id}
                            moveType={filterOption.name}
                            onClick={() => handleFilterClick(filterOption)}
                        />
                    )
                })}
                <MoveTypeBadge
                    modifier={favModifier}
                    value={"favourite"}
                    moveType={'Favourite'}
                    onClick={handleFavoriteClick}
                />
            </div>
        </div>
    )
}

export default TagsView;