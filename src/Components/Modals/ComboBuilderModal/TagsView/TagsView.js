import React from 'react';
import './TagsView.scss';
import CharacterBadge from '../../../CharacterBadge';
import { CHARACTERS } from '../../../../constants';

const TagsView = ({
    characterIds,
    selectedCharacterTags,
    selectedTags,
    setSelectedTags,
    setSelectedCharacterTags
}) => {

    const handleCharacterTagClick = ({ target: { value, className } }) => {
        let updatedTags;

        if (className.includes('selected')) {
            updatedTags = selectedCharacterTags.filter(tag => tag !== value);
        } else {
            updatedTags = [...selectedCharacterTags.map(tag => tag), value];
        }
        setSelectedCharacterTags(updatedTags);
    }

    const handleAllClick = ({ target: { className } }) => {
        let updatedTags;

        if (className.includes('selected')) {
            updatedTags = [];
        } else {
            updatedTags = CHARACTERS.map(character => character.id);
        }
        setSelectedCharacterTags(updatedTags);
    }

    const handleTagClick = ({ target: { value, className } }) => {
        let updatedTags;

        if (className.includes('selected')) {
            updatedTags = selectedTags.filter(tag => tag !== value);
        } else {
            updatedTags = [...selectedTags.map(tag => tag), value];
        }
        setSelectedTags(updatedTags);
    }
    
    return (
        <div className='tags-view'>
            <div className='tags-view__characters'>
                {characterIds.map(character =>
                    <CharacterBadge
                        key={character}
                        character={character}
                        value={character}
                        modifier={selectedCharacterTags.includes(character) ? 'selected' : ''}
                        onClick={handleCharacterTagClick}
                    />
                )}
                <CharacterBadge
                    character="ALL"
                    modifier={selectedCharacterTags.length === CHARACTERS.length ? 'selected' : ''}
                    onClick={handleAllClick}
                />
            </div>
            <div className='tags-view__others'>
                <CharacterBadge
                    character="side"
                    modifier={selectedTags.includes('side') ? 'selected' : ''}
                    onClick={handleTagClick}
                />
                <CharacterBadge
                    character="ch"
                    modifier={selectedTags.includes('ch') ? 'selected' : ''}
                    onClick={handleTagClick}
                />
                <CharacterBadge
                    character="wall"
                    modifier={selectedTags.includes('wall') ? 'selected' : ''}
                    onClick={handleTagClick}
                />
            </div>

        </div>
    )
}

export default TagsView;