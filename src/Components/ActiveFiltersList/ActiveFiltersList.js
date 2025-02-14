import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../MoveTypeBadge';
import MoveCommand from '../MoveCommand';
import Button from '../Button';

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
                    switch (key) {
                        case 'command':
                            return (
                                <MoveCommand
                                    key={id}
                                    command={value.split('-')}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'launcher':
                            return (
                                <MoveCommand
                                    key={id}
                                    modifier={"launcher"}
                                    command={value.split('-')}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'pseudo-launcher':
                            return (
                                <MoveCommand
                                    key={id}
                                    modifier={"pseudo-launcher"}
                                    command={name.split('-')}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'attack_level':
                            return (
                                <MoveTypeBadge
                                    key={id}
                                    modifier={value}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'character_tags':
                            return (
                                <MoveTypeBadge
                                    key={id}
                                    modifier={weight_short_name}
                                    moveType={short_name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'dodge_direction':
                            return (
                                <MoveTypeBadge
                                    key={id}
                                    modifier={'not-selected'}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'text_search':
                            return (
                                <MoveTypeBadge
                                    key={id}
                                    modifier={'not-selected'}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        default:
                            const modifier = id.includes('attack_level/')  ||id.includes('other/') ?
                                value: 'not-selected';
                            return (
                                <MoveTypeBadge
                                    key={id}
                                    modifier={modifier}
                                    moveType={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                    }
                })}
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