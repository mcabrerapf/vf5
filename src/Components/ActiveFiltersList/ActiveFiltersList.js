import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../MoveTypeBadge';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import CharacterBadge from '../CharacterBadge';

const ActiveFiltersList = ({
    selectedFilters,
    selectedSort,
    onSortClick,
    onFilterClick
}) => {

    return (
        <div className='active-filters-list'>
            <div className='active-filters-list__filters'>
                {selectedFilters.map(selectedFilter => {
                    const [filterType, parsedFilterName] = selectedFilter.split('/')

                    return (
                        <>
                            {filterType === 'command' &&
                                <MoveCommand
                                    key={`${parsedFilterName}-command`}
                                    command={parsedFilterName.match(/\[.*?\]/g)}
                                    onClick={() => onFilterClick({ target: { value: selectedFilter } })}
                                />
                            }
                            {filterType === 'level' &&
                                <MoveTypeBadge
                                    key={`${parsedFilterName}-type`}
                                    moveType={parsedFilterName}
                                    value={selectedFilter}
                                    onClick={onFilterClick}
                                />
                            }
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
            {!!selectedSort &&
                <Button
                    text={selectedSort}
                    onClick={onSortClick}
                />
            }
        </div>
    )
}

export default ActiveFiltersList;