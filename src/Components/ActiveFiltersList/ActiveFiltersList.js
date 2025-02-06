import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../MoveTypeBadge';
import MoveCommand from '../MoveCommand';
import Button from '../Button';
import { capitalizeFirstLetter } from '../../helpers';

const ActiveFiltersList = ({
    selectedFilters = [],
    selectedSort,
    onSortClick = () => { },
    onSortDirClick = () => { },
    onFilterClick = () => { },
}) => {

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
            {selectedSort && selectedSort.id &&
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