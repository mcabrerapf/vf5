import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../MoveTypeBadge';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import { capitalizeFirstLetter } from '../../helpers';

const ActiveFiltersList = ({
    selectedFilters,
    selectedSort,
    onSortClick,
    onFilterClick
}) => {
    const showSort = selectedSort && !!selectedSort.split('/')[0];
    return (
        <div className='active-filters-list'>
            <div className='active-filters-list__filters'>
                {selectedFilters.map(selectedFilter => {
                    const { id, name, prefix } = selectedFilter
                    return (
                        <>
                            {prefix === 'command' &&
                                <MoveCommand
                                    key={id}
                                    command={name.match(/\[.*?\]/g)}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {prefix === 'launcher' &&
                                <MoveCommand
                                    key={id}
                                    modifier={"launcher"}
                                    command={name.match(/\[.*?\]/g)}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {prefix === 'attack_level' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={id}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {prefix === 'character' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={"character"}
                                    moveType={capitalizeFirstLetter(id)}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {prefix === 'other' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={id}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                        </>
                    )
                }
                )}
            </div>
            {!!showSort &&
                <Button
                    text={selectedSort}
                    onClick={onSortClick}
                />
            }
        </div>
    )
}

export default ActiveFiltersList;