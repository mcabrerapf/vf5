import './MoveListFiltersModal.scss'
import React, { useState } from 'react';
import ModalFooter from '../ModalFooter';
import Button from '../../Button';
import CommandView from './CommandView';
import { useModalContext } from '../../../Contexts/ModalContext';
import { STRINGS } from '../../../constants';

const MoveListFiltersModal = ({
    selectedFilters,
    filterOptions,
}) => {
    console.log(filterOptions)
    const { closeModal } = useModalContext();
    const [selectedTypeFilters, setSelectedTypeFilters] = useState(selectedFilters);
    const [filtersView, setFiltersView] = useState(STRINGS.TAGS)
    const [commandFilter, setCommandFilter] = useState([])

    const attackLevelFilters = [];
    const dodgeFilters = [];
    const frameDatFilters = {};

    filterOptions.forEach(fOption => {
        const { id: fId, key: fKey } = fOption;
        if (fKey === 'attack_level') attackLevelFilters.push(fOption);
        if (fKey === 'dodge_direction') dodgeFilters.push(fOption);
        if (fId.includes("is_plus_on") ||
            fId.includes("is_punishable_on") ||
            fId.includes("guarantees_on") ||
            fId.includes("launches_on") ||
            fId.includes("staggers_on")) {
            const [s] = fId.split('/');
            if (!frameDatFilters[s]) frameDatFilters[s] = [];
            frameDatFilters[s].push(fOption)
        };
    })
    console.log(frameDatFilters)
    const handleFilterSave = () => {
        const stringCommand = commandFilter.join('-');
        const isRepeat = selectedFilters.find(selected => selected.value === stringCommand);
        if (!stringCommand || isRepeat) {
            closeModal(selectedTypeFilters);
            return;
        }
        const newCommand = {
            id: `command/${stringCommand}`,
            key: 'command',
            value: stringCommand,
            name: 'Command',
            short_name: 'Cmd'
        }
        const withCommand = [...selectedTypeFilters, newCommand];
        closeModal(withCommand);
    }

    const handleFilterClick = (filter) => {
        let newTypeFilters;
        const hasFilter = !!selectedTypeFilters.find(selected => selected.id === filter.id)

        if (hasFilter) {
            newTypeFilters = selectedTypeFilters.filter(value => value.id !== filter.id);
        } else {
            newTypeFilters = [...selectedTypeFilters.map(val => val), filter];
        }

        setSelectedTypeFilters(newTypeFilters);
    }

    const handleFiltersReset = () => {
        setSelectedTypeFilters([]);
    }

    return (
        <div className='movelist-filters-modal'>
            <div className='movelist-filters-modal__sub-header'>
                <Button
                    modifier={filtersView === STRINGS.TAGS ? 'active left' : 'left'}
                    text='Attack Level'
                    onClick={() => setFiltersView(STRINGS.TAGS)}
                />
                <Button
                    modifier={filtersView === STRINGS.FRAME_DATA ? 'active center' : 'center'}
                    text='Frame Data'
                    onClick={() => setFiltersView(STRINGS.FRAME_DATA)}
                />
                <Button
                    modifier={filtersView === STRINGS.DODE_DIRECTION ? 'active center' : 'center'}
                    text='Dodge'
                    onClick={() => setFiltersView(STRINGS.DODE_DIRECTION)}
                />
                <Button
                    modifier={filtersView === STRINGS.COMMAND ? 'active right' : 'right'}
                    text='Command'
                    onClick={() => setFiltersView(STRINGS.COMMAND)}

                />
            </div>
            <div className='movelist-filters-modal__content'>
                {filtersView === STRINGS.TAGS &&
                    <div
                        className='movelist-filters-modal__content__options'
                    >
                        {attackLevelFilters.map(fOption => {
                            const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                            const modifier = isSelected ? `move-type ${fOption.value}` : '';
                            return (
                                <Button
                                    key={fOption.id}
                                    modifier={modifier}
                                    value={fOption.id}
                                    text={fOption.name}
                                    onClick={() => handleFilterClick(fOption)}
                                />
                            )
                        })}
                    </div>
                }
                {filtersView === STRINGS.FRAME_DATA &&
                    <div
                        className='movelist-filters-modal__content__options'
                    >
                        {Object.keys(frameDatFilters).map(fdFilterKey => {
                            const fDFilter = frameDatFilters[fdFilterKey];
                            return (
                                fDFilter.map(fOption => {
                                    const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                                    const modifier = isSelected ? 'active' : '';

                                    return (
                                        <Button
                                            key={fOption.id}
                                            modifier={modifier}
                                            value={fOption.id}
                                            text={fOption.short_name}
                                            onClick={() => handleFilterClick(fOption)}
                                        />
                                    )
                                })
                            )
                            // return (
                            //     <div>
                            //         <div>{fdFilterKey}</div>
                            //         {fDFilter.map(fOption => {
                            //             // const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                            //             // const modifier = isSelected ? `move-type ${fOption.value}` : '';

                            //             return (
                            //                 <Button
                            //                     key={fOption.id}
                            //                     modifier={''}
                            //                     value={fOption.id}
                            //                     text={fOption.name}
                            //                     onClick={() => handleFilterClick(fOption)}
                            //                 />
                            //             )
                            //         })}
                            //     </div>
                            // )
                        })
                        }
                    </div>
                }
                {filtersView === STRINGS.DODE_DIRECTION &&
                    <div
                        className='movelist-filters-modal__content__options'
                    >
                        {dodgeFilters.map(fOption => {
                            const isSelected = !!selectedTypeFilters.find(sFilter => sFilter.id === fOption.id);
                            const modifier = isSelected ? 'active' : '';
                            return (
                                <Button
                                    key={fOption.id}
                                    modifier={modifier}
                                    value={fOption.id}
                                    text={fOption.name}
                                    onClick={() => handleFilterClick(fOption)}
                                />
                            )
                        })}
                    </div>
                }
                {filtersView === STRINGS.COMMAND &&
                    <CommandView
                        commandFilter={commandFilter}
                        setCommandFilter={setCommandFilter}
                    />
                }
            </div>
            <ModalFooter>
                <Button
                    text='Reset'
                    modifier={'active reset'}
                    onClick={handleFiltersReset}
                />
                <Button
                    text='✓'
                    modifier={'active'}
                    onClick={handleFilterSave}
                />
            </ModalFooter>

        </div>
    )
}

export default MoveListFiltersModal;