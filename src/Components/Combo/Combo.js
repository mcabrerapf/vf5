import React, { useEffect, useState } from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { CHARACTERS, COMBOS_SORT_OPTIONS } from '../../constants';
import { stringNotationParser } from '../../helpers';
import Button from '../Button';
import TextWithCommand from '../TextWithCommand';
import { DownloadIcon, EditIcon, ThumbsDownIcon, ThumbsUpIcon } from '../Icon';
import { updateLikes } from '../../services/aws';

const Combo = ({
    combo = {},
    selectedSort = {},
    selectedFilters = [],
    showSimpleView = false,
    showSaveButton = false,
    hideFavouriteButton = false,
    hideEditButton = false,
    showLikes = false,
    disabledSaveButton = false,
    disabledLikes = false,
    showOtherTags = false,
    characterFilterOptions = [],
    combosFilterOptions = [],
    onClick = () => { },
    handleSortChange = () => { },
    onFavouriteClick = () => { },
    handleFiltersChange = () => { },
    onTagClick = () => { },
    onSaveButtonClick = () => { },
}) => {
    const [likes, setLikes] = useState(combo?.likes || 0);
    const [dislikes, setDislikes] = useState(combo?.dislikes || 0);
    const [debouncedData, setDebouncedData] = useState({ likes, dislikes });
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

    useEffect(() => {
        const handler = setTimeout(() => {
            if (likes !== debouncedData.likes || dislikes !== debouncedData.dislikes) {
                setDebouncedData({ likes, dislikes });
                updateLikes({ combo: { id: combo.id, likes, dislikes } });
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [likes, dislikes, debouncedData.likes, debouncedData.dislikes, combo.id]);

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
        if (showSimpleView) return;
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

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSaveButtonClick(combo);
    }

    const handleCommandClick = (e) => {
        e.stopPropagation();
        const updatedSort = isCommandSortSelected ?
            { ...selectedSort, dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc' } :
            COMBOS_SORT_OPTIONS.find(sOption => sOption.key === 'command');
        handleSortChange(updatedSort);
    }

    const handleLike = () => setLikes((prev) => prev + 1);
    const handleDislike = () => setDislikes((prev) => prev + 1);

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
                        {!hideFavouriteButton &&
                            <Button
                                onClick={handleFavouriteClick}
                                modifier={favourite ? 'small favourite' : 'small'}
                                text={'★'}
                            />
                        }
                        {!hideEditButton &&
                            <Button
                                onClick={handleComboClick}
                            >
                                <EditIcon />
                            </Button>
                        }
                        {showSaveButton &&
                            <Button
                                disabled={disabledSaveButton}
                                onClick={handleSaveButtonClick}
                            >
                                <DownloadIcon />
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
                <div
                    className='combo__command__buttons'
                >
                    {showSimpleView &&
                        <>
                            <Button
                                onClick={handleDamageClick}
                                modifier={isDamageSortSelected ? 'sort-selected damage' : 'damage'}
                                text={damage}
                            />
                            {!hideFavouriteButton &&
                                <Button
                                    onClick={handleFavouriteClick}
                                    modifier={favourite ? 'small favourite' : 'small'}
                                    text={'★'}
                                />
                            }
                            {!hideEditButton &&
                                <Button
                                    onClick={handleComboClick}
                                >
                                    <EditIcon />
                                </Button>
                            }
                        </>
                    }
                </div>
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
            {showSimpleView && showOtherTags &&
                <div className='combo__tags'>
                    {hasAllCharacters &&
                        <MoveTypeBadge
                            modifier={"character"}
                            moveType={'ALL'}
                            onClick={handleAllClick}
                        />
                    }
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
            {showLikes &&
                <div
                    className='combo__thumb-buttons'
                >
                    <span
                        className='combo__thumb-buttons__dislikes'
                    >
                        {dislikes}
                    </span>
                    <Button
                        disabled={disabledLikes}
                        onClick={handleDislike}
                    >
                        <ThumbsDownIcon />
                    </Button>

                    <span
                        className='combo__thumb-buttons__likes'
                    >
                        {likes}
                    </span>
                    <Button
                        disabled={disabledLikes}
                        onClick={handleLike}
                    >
                        <ThumbsUpIcon />
                    </Button>

                </div>
            }
        </div>
    )
}

export default Combo;