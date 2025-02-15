import React from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { CHARACTERS, COMBOS_SORT_OPTIONS } from '../../constants';
import { stringNotationParser } from '../../helpers';
import Button from '../Button';
import TextWithCommand from '../TextWithCommand';
import { EditIcon } from '../Icon';

const Combo = ({
    combo = {},
    selectedSort = {},
    selectedFilters = [],
    showSimpleView = false,
    hideEditButton = false,
    characterFilterOptions = [],
    combosFilterOptions = [],
    onClick = () => { },
    handleSortChange = () => { },
    onFavouriteClick = () => { },
    handleFiltersChange = () => { },
    onTagClick = () => { }
}) => {
    const {
        name,
        tags,
        character_tags,
        launcher,
        command,
        damage,
        note,
        favourite
    } = combo || {};
    const hasAllCharacters = CHARACTERS.length === character_tags.length;
    const isDamageSortSelected = selectedSort.id === 'damage';
    const isNameSortSelected = selectedSort.id === 'name';
    const isCommandSortSelected = selectedSort.id === 'command';

    const handleComboClick = (e) => {
        onClick(e);
    }

    const handleTagClick = (e) => {
        e.stopPropagation();
        onTagClick(e);
    }

    const handleCharacterClick = (characterFilter) => {
        const filteredFilters = selectedFilters
            .filter(sFilter => sFilter.id !== characterFilter.id)
        if (filteredFilters.length === selectedFilters.length) {
            handleFiltersChange([...selectedFilters, characterFilter])
        } else {
            handleFiltersChange(filteredFilters);
        }
    }

    const handleAllClick = (e) => {
        e.stopPropagation();
        const filteredFilters = selectedFilters
            .filter(sFilter => sFilter.key !== 'character_tags')
        handleFiltersChange(filteredFilters)
    }

    const handleLauncherClick = (e) => {
        if(showSimpleView) return;
        e.stopPropagation();
        const stringLauncher = launcher.join('-');
        const launcherId = `launcher/${stringLauncher}`;
        const filteredFilters = selectedFilters
            .filter(sFilter => sFilter.id !== launcherId)
        if (filteredFilters.length === selectedFilters.length) {
            const launcherFIlter = {
                id: launcherId,
                key: 'launcher',
                value: stringLauncher,
                name: 'Launcher',
                short_name: 'Lch'
            }
            handleFiltersChange([...selectedFilters, launcherFIlter]);
        } else {
            handleFiltersChange(filteredFilters);
        }
    }

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onFavouriteClick(combo.id);
    }

    const handleDamageClick = (e) => {
        e.stopPropagation();
        const updatedSort = isDamageSortSelected ?
            { ...selectedSort, dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc' } :
            COMBOS_SORT_OPTIONS.find(sOption => sOption.key === 'damage');
        handleSortChange(updatedSort);
    }

    const handleNameClick = (e) => {
        e.stopPropagation();
        const updatedSort = isNameSortSelected ?
            { ...selectedSort, dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc' } :
            COMBOS_SORT_OPTIONS.find(sOption => sOption.key === 'name');
        handleSortChange(updatedSort);
    }

    const handleCommandClick = (e) => {
        e.stopPropagation();
        const updatedSort = isCommandSortSelected ?
            { ...selectedSort, dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc' } :
            COMBOS_SORT_OPTIONS.find(sOption => sOption.key === 'command');
        handleSortChange(updatedSort);
    }
    const parsedNote = stringNotationParser(note);
    const favouriteModifier = favourite ? ' favourite' : '';
    const nameModifier = isNameSortSelected && 'sort-selected';
    const nameClassName = ['combo__main__name', nameModifier, favouriteModifier]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={`combo${favourite ? ' favourite' : ''}${showSimpleView ? ' simple' : ''}`}
            onClick={handleComboClick}
        >
            {!showSimpleView &&
                <div className='combo__main'>
                    <div
                        role='button'
                        className={nameClassName}
                        onClick={handleNameClick}
                    >
                        {name}
                    </div>
                    <div className='combo__main__other'>
                        <Button
                            onClick={handleDamageClick}
                            modifier={isDamageSortSelected ? 'sort-selected damage' : 'damage'}
                            text={damage}
                        />
                        <Button
                            onClick={handleFavouriteClick}
                            modifier={favourite ? 'small favourite' : 'small'}
                            text={'★'}
                        />
                        {!hideEditButton &&
                            <Button
                                onClick={handleComboClick}
                            >
                                <EditIcon />
                            </Button>
                        }
                    </div>
                </div>
            }
            <div
                className='combo__command'
            >
                <MoveCommand
                    onClick={handleLauncherClick}
                    modifier={"launcher"}
                    command={[...launcher, "⊙", ...command]}
                />
                {showSimpleView &&
                    <Button
                        onClick={handleDamageClick}
                        modifier={isDamageSortSelected ? 'sort-selected damage' : 'damage'}
                        text={damage}
                    />
                }
            </div>
            {parsedNote &&
                <div className='combo__note'>
                    <TextWithCommand
                        content={parsedNote}
                    />
                </div>
            }
            {!showSimpleView &&
                <div className='combo__tags'>
                    {hasAllCharacters &&
                        <MoveTypeBadge
                            modifier={"character"}
                            moveType={'ALL'}
                            onClick={handleAllClick}
                        />
                    }
                    {!hasAllCharacters && characterFilterOptions.map(cOption => {
                        return (
                            <MoveTypeBadge
                                key={cOption.id}
                                disabled={!character_tags.find(cTag => cTag === cOption.value)}
                                modifier={cOption.weight_short_name}
                                moveType={cOption.initials}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCharacterClick(cOption);
                                }}
                            />
                        )
                    }
                    )}
                    {tags.map(tag => {
                        const tagMatch = combosFilterOptions.find(cOption => cOption.value === tag);
                        const modifier =
                            tagMatch.id.includes('attack_level/') || tagMatch.id.includes('other/') ?
                                tagMatch.value : "not-selected";
                        return (
                            <MoveTypeBadge
                                key={tag}
                                modifier={modifier}
                                value={tag}
                                moveType={tagMatch.short_name}
                                onClick={handleTagClick}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Combo;