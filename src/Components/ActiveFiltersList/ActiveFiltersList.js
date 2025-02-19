import React from 'react';
import './ActiveFiltersList.scss'
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
                    if (key === 'favourite') return null;

                    switch (key) {
                        case 'command':
                            return (
                                <Button
                                    onClick={() => onFilterClick(selectedFilter)}
                                >
                                    <MoveCommand
                                        key={id}
                                        command={value.split('-')}
                                    />
                                </Button>
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
                                <Button
                                    key={id}
                                    modifier={`move-type ${value}`}
                                    text={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        case 'character_tags':
                            return (
                                <Button
                                    key={id}
                                    modifier={weight_short_name}
                                    text={short_name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                        default:
                            const modifier = id.includes('attack_level/') || id.includes('other/') ?
                                `move-type ${value}` : '';
                            return (
                                <Button
                                    key={id}
                                    modifier={modifier}
                                    text={name}
                                    value={selectedFilter}
                                    onClick={() => onFilterClick(selectedFilter)}
                                />
                            )
                    }
                })}
            </div>
            {selectedSort?.id &&
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