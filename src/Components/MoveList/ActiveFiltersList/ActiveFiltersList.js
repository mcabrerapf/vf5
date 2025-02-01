import React from 'react';
import './ActiveFiltersList.scss'
import MoveTypeBadge from '../../MoveTypeBadge';
import Notation from '../../Notation';
import MoveCommand from '../../MoveCommand';

const ActiveFiltersList = ({
    selectedFilters,
    handleFiltersChange
}) => {

    const onFilterClick = ({ target: { value } }) => {
        const newFilters = selectedFilters.filter(filter => filter !== value);
        handleFiltersChange(newFilters);
    }

    return (
        <div className='active-filters-list'>
            {selectedFilters.map(selectedFilter => {

                const [filterType, parsedFilterName] = selectedFilter.split('/')

                return (
                    <>
                        {filterType === 'command' &&
                            <MoveCommand
                                key={parsedFilterName}
                                command={parsedFilterName.match(/\[.*?\]/g)}
                                onClick={() => onFilterClick({ target: { value: selectedFilter } })}
                            />
                        }
                        {filterType === 'level' &&
                            <MoveTypeBadge
                                key={parsedFilterName}
                                moveType={parsedFilterName}
                                value={selectedFilter}
                                onClick={onFilterClick}
                            />}
                    </>

                )
            }
            )}
        </div>
    )
}

export default ActiveFiltersList;