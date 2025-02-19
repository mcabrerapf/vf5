import React, { useEffect, useState } from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import { CHARACTERS, COMBOS_SORT_OPTIONS } from '../../constants';
import { stringNotationParser } from '../../helpers';
import Button from '../Button';
import TextWithCommand from '../TextWithCommand';
import { DownloadIcon, EditIcon, ThumbsUpIcon } from '../Icon';
import { updateLikes } from '../../services/aws';
import { getLikedCombos, updateLikedCombos } from '../../services';

const Combo = ({
    combo = {},
    selectedSort = {},
    selectedFilters = [],
    showSimpleView = false,
    showSaveButton = false,
    hideFavouriteButton = false,
    hideEditButton = false,
    showLikes = false,
    disableSaveButton = false,
    disableLikes = false,
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
    const likedCombos = getLikedCombos();
    const likedMatch = !!likedCombos.find(lCombo => lCombo === combo.id);
    const [isLiked, setIsLiked] = useState(likedMatch);
    const [likes, setLikes] = useState(combo.likes);
    const [debouncedLike, setDebouncedLike] = useState(likedMatch);


    const hasAllCharacters = CHARACTERS.length === character_tags.length;
    const isDamageSortSelected = selectedSort.id === 'damage';
    const isNameSortSelected = selectedSort.id === 'name';
    const isCommandSortSelected = selectedSort.id === 'command';

    useEffect(() => {
        const handler = setTimeout(() => {
            if (isLiked === debouncedLike) return;

            updateLikes({
                comboId: combo.id,
                increase: isLiked
            })
            updateLikedCombos(combo.id);
            setDebouncedLike(isLiked);
        }, 500);
        return () => clearTimeout(handler);
    }, [isLiked, combo.id, combo.likes, combo.dislikes, debouncedLike]);

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

    const handleLike = () => {
        setIsLiked((prev) => !prev)
        const newLikes = !isLiked ? likes + 1 : likes - 1;
        setLikes(newLikes);
    };

    const parsedNote = stringNotationParser(note);
    const favouriteModifier = favourite ? ' favourite' : '';
    const nameModifier = isNameSortSelected && 'sort-selected';
    const nameClassName = ['combo__main__name', nameModifier, favouriteModifier]
        .filter(Boolean)
        .join(' ');
    const attackLevelTags = [];
    const otherTags = [];
    const moveCategoryTags = [];
    tags.forEach(tag => {
        const tagMatch = combosFilterOptions.find(cOption => cOption.value === tag);
        if (tagMatch?.id.includes('attack_level/')) attackLevelTags.push(tagMatch);
        if (tagMatch?.id.includes('other/')) otherTags.push(tagMatch);
        if (tagMatch?.id.includes('move_category/')) moveCategoryTags.push(tagMatch);
    })

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
                            modifier={isDamageSortSelected ? 's sort-selected damage' : 's damage'}
                            text={damage}
                        />
                        {!hideFavouriteButton &&
                            <Button
                                onClick={handleFavouriteClick}
                                modifier={favourite ? 's favourite' : 's'}
                                text={'★'}
                            />
                        }
                        {!hideEditButton &&
                            <Button
                                modifier={'s'}
                                onClick={handleComboClick}
                            >
                                <EditIcon />
                            </Button>
                        }
                        {showSaveButton &&
                            <Button
                                modifier={'s'}
                                disabled={disableSaveButton}
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
                                modifier={isDamageSortSelected ? 's sort-selected damage' : 's damage'}
                                text={damage}
                            />
                            {showSaveButton &&
                                <Button
                                    modifier={'s'}
                                    disabled={disableSaveButton}
                                    onClick={handleSaveButtonClick}
                                >
                                    <DownloadIcon />
                                </Button>
                            }
                            {!hideFavouriteButton &&
                                <Button
                                    onClick={handleFavouriteClick}
                                    modifier={favourite ? 's favourite' : 's'}
                                    text={'★'}
                                />
                            }
                            {!hideEditButton &&
                                <Button
                                    modifier={'s'}
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
                        <Button
                            modifier={"s character"}
                            text={'ALL'}
                            onClick={handleAllClick}
                        />
                    }
                    {!hasAllCharacters && characterFilterOptions.map(cOption => {
                        return (
                            <Button
                                key={cOption.id}
                                disabled={!character_tags.find(cTag => cTag === cOption.value)}
                                modifier={`s ${cOption.weight_short_name}`}
                                text={cOption.initials}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCharacterClick(cOption);
                                }}
                            />
                        )
                    }
                    )}
                    {attackLevelTags.map(tag => {
                        return (
                            <Button
                                key={tag.id}
                                modifier={`s move-type ${tag.value}`}
                                value={tag.value}
                                text={tag?.short_name || tag.value}
                                onClick={handleTagClick}
                            />
                        )
                    })}
                    {otherTags.map(tag => {
                        return (
                            <Button
                                key={tag.id}
                                modifier={`s move-type ${tag.value}`}
                                value={tag.value}
                                text={tag?.short_name || tag.value}
                                onClick={handleTagClick}
                            />
                        )
                    })}
                    {moveCategoryTags.map(tag => {
                        return (
                            <Button
                                key={tag.id}
                                modifier={'s'}
                                value={tag.value}
                                text={tag?.short_name || tag.value}
                                onClick={handleTagClick}
                            />
                        )
                    })}
                </div>
            }
            {showSimpleView && showOtherTags &&
                <div className='combo__tags'>
                    {attackLevelTags.map(tag => {
                        return (
                            <Button
                                key={tag.id}
                                modifier={`s move-type ${tag.value}`}
                                value={tag.value}
                                text={tag?.short_name || tag.value}
                                onClick={handleTagClick}
                            />
                        )
                    })}
                    {otherTags.map(tag => {
                        return (
                            <Button
                                key={tag.id}
                                modifier={`s move-type ${tag.value}`}
                                value={tag.value}
                                text={tag?.short_name || tag.value}
                                onClick={handleTagClick}
                            />
                        )
                    })}
                    {moveCategoryTags.map(tag => {
                        return (
                            <Button
                                key={tag.id}
                                modifier={'s'}
                                value={tag.value}
                                text={tag?.short_name || tag.value}
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
                        className='combo__thumb-buttons__likes'
                    >
                        {likes}
                    </span>
                    <Button
                        modifier={`s${isLiked ? ' liked' : ""}`}
                        disabled={disableLikes}
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