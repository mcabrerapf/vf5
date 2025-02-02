import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../../MoveTypeBadge';
import MoveCommand from '../../MoveCommand';
import Button from '../../Button';
import { LOCAL_KEYS } from '../../../constants';
import setLocalStorage from '../../../helpers/setLocalStorage';

const ActiveFiltersList = ({
    selectedFilters,
    selectedMovelistSort,
    setSelectedMovelistSort,
    handleFiltersChange
}) => {

    const onFilterClick = ({ target: { value } }) => {
        const newFilters = selectedFilters.filter(filter => filter !== value);
        handleFiltersChange(newFilters);
    }

    const onSortClick = () => {
        setLocalStorage(LOCAL_KEYS.SELECTED_MOVELIST_SORT, '/asc');
        setSelectedMovelistSort('/asc');
    }

    const [sortType] = selectedMovelistSort.split('/');

    return (
        <div className='active-filters-list'>
            {!!sortType &&
                <Button
                    text={selectedMovelistSort}
                    onClick={onSortClick}
                />
            }
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
                    </>
                )
            }
            )}
        </div>
    )
}

export default ActiveFiltersList;