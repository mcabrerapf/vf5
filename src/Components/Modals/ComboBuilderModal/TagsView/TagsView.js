import React, { useState } from 'react';
import './TagsView.scss';
import CharacterBadge from '../../../CharacterBadge';
import { CHARACTERS, MOVE_LEVEL_MATCHES } from '../../../../constants';
import MoveTypeBadge from '../../../MoveTypeBadge';
import Button from '../../../Button';

const TagsView = ({
    characterIds,
    selectedCharacterTags,
    selectedTags,
    setSelectedTags,
    setSelectedCharacterTags
}) => {
    const [tagsView, setTagsView] = useState('characters');

    const handleCharacterTagClick = ({ target: { value, className } }) => {
        let updatedTags;

        if (className.includes('not-selected')) {
            updatedTags = [...selectedCharacterTags.map(tag => tag), value];

        } else {
            updatedTags = selectedCharacterTags.filter(tag => tag !== value);
        }
        setSelectedCharacterTags(updatedTags);
    }

    const handleAllClick = ({ target: { className } }) => {
        let updatedTags;

        if (className.includes('not-selected')) {
            updatedTags = CHARACTERS.map(character => character.id);
        } else {
            updatedTags = [];
        }
        setSelectedCharacterTags(updatedTags);
    }

    const handleTagClick = ({ target: { value, className } }) => {
        let updatedTags;

        if (className.includes('not-selected')) {
            updatedTags = [...selectedTags.map(tag => tag), value];
        } else {
            updatedTags = selectedTags.filter(tag => tag !== value);
        }
        setSelectedTags(updatedTags);
    }
    const otherTags = [...new Set(Object.keys(MOVE_LEVEL_MATCHES).map(key => MOVE_LEVEL_MATCHES[key]))];

    return (
        <div className='tags-view'>
            <div className='tags-view__header'>
                <Button
                    modifier={tagsView === 'characters' ? 'active middle' : 'middle'}
                    text="Characters"
                    onClick={() => setTagsView('characters')}
                />
                <Button
                    modifier={tagsView === 'other' ? 'active middle' : 'middle'}
                    text="Other"
                    onClick={() => setTagsView('other')}
                />
            </div>
            <div className='tags-view__content'>
                {tagsView === 'characters' &&
                    <div className='tags-view__content__characters'>
                        {characterIds.map(character =>
                            <CharacterBadge
                                key={character}
                                character={character}
                                value={character}
                                modifier={selectedCharacterTags.includes(character) ? '' : 'not-selected'}
                                onClick={handleCharacterTagClick}
                            />
                        )}
                        <CharacterBadge
                            character="ALL"
                            modifier={selectedCharacterTags.length === CHARACTERS.length ? '' : 'not-selected'}
                            onClick={handleAllClick}
                        />
                    </div>
                }
                {tagsView === 'other' &&
                    <div className='tags-view__content__other-tags'>
                        {otherTags.map(tag =>
                            <MoveTypeBadge
                                key={tag}
                                moveType={tag}
                                modifier={selectedTags.includes(tag) ? '' : 'not-selected'}
                                onClick={handleTagClick}
                            />
                        )}
                        <MoveTypeBadge
                            moveType="side"
                            modifier={selectedTags.includes('side') ? '' : 'not-selected'}
                            onClick={handleTagClick}
                        />
                        <MoveTypeBadge
                            moveType="ch"
                            modifier={selectedTags.includes('ch') ? '' : 'not-selected'}
                            onClick={handleTagClick}
                        />
                        <MoveTypeBadge
                            moveType="wall"
                            modifier={selectedTags.includes('wall') ? '' : 'not-selected'}
                            onClick={handleTagClick}
                        />
                    </div>
                }
            </div>


        </div>
    )
}

export default TagsView;