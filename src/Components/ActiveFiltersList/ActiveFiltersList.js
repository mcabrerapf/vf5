import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../MoveTypeBadge';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import { capitalizeFirstLetter } from '../../helpers';

const ActiveFiltersList = ({
    selectedFilters = [],
    selectedSort = {},
    onSortClick = () => { },
    onSortDirClick = () => { },
    onFilterClick = () => { },
}) => {
    return (
        <div className='active-filters-list'>
            <div className='active-filters-list__filters'>
                {selectedFilters.map(selectedFilter => {
                    const { id, name, short_name, value, key, weight_short_name } = selectedFilter
                    return (
                        <>
                            {key === 'command' &&
                                <MoveCommand
                                    key={id}
                                    command={value.split('-')}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'launcher' &&
                                <MoveCommand
                                    key={id}
                                    modifier={"launcher"}
                                    command={value.split('-')}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'pseudo-launcher' &&
                                <MoveCommand
                                    key={id}
                                    modifier={"pseudo-launcher"}
                                    command={name.split('-')}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'attack_level' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={value}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'character_tags' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={weight_short_name}
                                    moveType={short_name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'tags' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={id}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'dodge_direction' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={'not-selected'}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            }
                            {key === 'text_search' &&
                                <MoveTypeBadge
                                    key={id}
                                    modifier={'not-selected'}
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
            {selectedSort.id &&
                <div className='active-filters-list__sort'>
                    <Button
                        modifier='active'
                        text={selectedSort.name}
                        onClick={onSortClick}
                    />
                    <Button
                        disabled={selectedSort.id === 'default'}
                        text={selectedSort.dir}
                        onClick={onSortDirClick}
                    />
                </div>
            }
        </div>
    )
}

export default ActiveFiltersList;