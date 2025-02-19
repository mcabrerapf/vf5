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
                                    key={id}
                                    onClick={() => onFilterClick(selectedFilter)}
                                >
                                    <MoveCommand
                                        command={value.split('-')}
                                    />
                                </Button>
                            )
                        case 'launcher':
                            return (
                                <Button
                                    key={id}
                                    modifier={"launcher"}
                                    onClick={() => onFilterClick(selectedFilter)}
                                >
                                    <MoveCommand
                                        command={value.split('-')}

                                    />
                                </Button>
                            )
                        case 'pseudo-launcher':
                            return (
                                <Button
                                    key={id}
                                    modifier={"pseudo-launcher"}
                                    onClick={() => onFilterClick(selectedFilter)}
                                >
                                    <MoveCommand
                                        command={name.split('-')}
                                    />
                                </Button>
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
                                    text={short_name}
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