import React from 'react';
import './ActiveFiltersList.scss'
import CharacterBadge from '../../CharacterBadge';
import MoveTypeBadge from '../../MoveTypeBadge';

const ActiveFiltersList = ({
    selectedFilters,
    handleFiltersChange
}) => {

    const onFilterClick = ({ target: { value } }) => {
        const newFilters = selectedFilters.filter(filter => filter !== value);
        handleFiltersChange(newFilters);
    }

    return (
        <div className='active-filters-list-combos'>
            {selectedFilters.map(selectedFilter => {
                const [filterType, parsedFilterName] = selectedFilter.split('/')

                return (
                    <>
                        {filterType === 'character' &&
                            <CharacterBadge
                                key={`${parsedFilterName}-character`}
                                character={parsedFilterName}
                                value={selectedFilter}
                                onClick={onFilterClick}
                            />
                        }
                        {filterType === 'other' &&
                            <MoveTypeBadge
                                key={`${parsedFilterName}-other`}
                                moveType={parsedFilterName}
                                value={selectedFilter}
                                onClick={onFilterClick}
                            />
                        }
                    </>
                )
            }
            )}
        </div>
    )
}

export default ActiveFiltersList;