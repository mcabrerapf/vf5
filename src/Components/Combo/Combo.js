import React from 'react';
import './Combo.scss'
import MoveCommand from '../MoveCommand';
import MoveTypeBadge from '../MoveTypeBadge';
import { CHARACTERS, COMBO_FILTER_OPTIONS } from '../../constants';
import { capitalizeFirstLetter, getLauncher } from '../../helpers';
import Button from '../Button';

const Combo = ({
    combo = {},
    selectedSort = {},
    onClick = () => { },
    handleSortChange = () => { },
    onLauncherClick = () => { },
    onFavouriteClick = () => { },
    onCharacterClick = () => { },
    onTagClick = () => { }
}) => {
    const { name, tags, characterTags, command, damage, note, favourite } = combo || {};
    const hasAllCharacters = CHARACTERS.length === characterTags.length;
    const [launcher, restOfCombo, fullLauncher] = getLauncher(command);
    const isDamageSortSelected = selectedSort.id === 'damage';
    const isCommandSortSelected = selectedSort.id === 'command';

    const handleComboClick = (e) => {
        onClick(e);
    }

    const handleTagClick = (e) => {
        e.stopPropagation();
        onTagClick(e);
    }

    const handleCharacterClick = (e) => {
        e.stopPropagation();
        onCharacterClick(e)
    }

    const handleLauncherClick = (e) => {
        e.stopPropagation();
        onLauncherClick({ target: { value: launcher } })
    }

    const handleFavouriteClick = (e) => {
        e.stopPropagation();
        onFavouriteClick(combo.id);
    }

    const handleDamageClick = (e) => {
        e.stopPropagation();
        const updatedSort = isDamageSortSelected ?
            { ...selectedSort, dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc' } :
            { id: 'damage', name: 'Damage', dir: 'asc' }
        handleSortChange(updatedSort);
    }

    const handleCommandClick = (e) => {
        e.stopPropagation();
        const updatedSort = isCommandSortSelected ?
            { ...selectedSort, dir: selectedSort.dir === 'asc' ? 'dsc' : 'asc' } :
            { id: 'command', name: 'Command', dir: 'asc' }
        handleSortChange(updatedSort);
    }

    if (restOfCombo[0] === 'ch') {
        fullLauncher.push(restOfCombo[0]);
        restOfCombo.shift();
    }
    if (restOfCombo[0] === '⊙') restOfCombo.shift();

    return (
        <div
            className={`combo${favourite ? ' favourite' : ''}`}
            onClick={handleComboClick}
        >
            <div className='combo__main'>
                <div className={`combo__main__name${favourite ? ' favourite' : ''}`}>
                    {name}
                </div>
                <div className='combo__main__other'>
                    <Button
                        onClick={handleDamageClick}
                        modifier={isDamageSortSelected ? 'active damage' : 'damage'}
                        text={damage}
                    />
                    <Button
                        onClick={handleFavouriteClick}
                        modifier={favourite ? 'small favourite' : 'small'}
                        text={'★'}
                    />
                </div>
            </div>
            <MoveCommand
                onClick={handleLauncherClick}
                modifier={"launcher"}
                command={fullLauncher}
            />
            {!!restOfCombo.length &&
                <MoveCommand
                    onClick={handleCommandClick}
                    command={restOfCombo}
                />
            }
            {note &&
                <div className='combo__note'>
                    {note}
                </div>
            }
            <div className='combo__tags'>
                {hasAllCharacters &&
                    <MoveTypeBadge
                        modifier={"character"}
                        moveType={'ALL'}
                        onClick={handleCharacterClick}
                    />
                }
                {!hasAllCharacters && characterTags.map(characterTag =>
                    <MoveTypeBadge
                        key={characterTag}
                        modifier={"character"}
                        moveType={capitalizeFirstLetter(characterTag)}
                        onClick={handleCharacterClick}
                    />
                )}
            </div>
            <div className='combo__tags'>
                {tags.map(tag => {
                    const { id } = COMBO_FILTER_OPTIONS.find(option => option.id === tag)

                    return (
                        <MoveTypeBadge
                            key={tag}
                            modifier={id}
                            moveType={tag}
                            onClick={handleTagClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Combo;