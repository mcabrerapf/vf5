import React, { useState } from 'react';
import { CHARACTERS } from '../../../../constants';
import MoveTypeBadge from '../../../MoveTypeBadge';
import Button from '../../../Button';
import { capitalizeFirstLetter } from '../../../../helpers';

const TagsView = ({
    selectedCharacterTags,
    selectedTags,
    combosFilterOptions,
    setSelectedTags,
    setSelectedCharacterTags
}) => {
    const [tagsView, setTagsView] = useState('characters');

    const handleCharacterTagClick = ({ target: { value, className } }) => {
        let updatedTags;

        if (className.includes('not-selected')) {
            updatedTags = [
                ...selectedCharacterTags.map(tag => tag),
                value
            ];

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
    console.log(combosFilterOptions)
    const otherTags = [];
    // const otherTags = combosFilterOptions.filter(option => option.key === 'tags');
    const characterTags = combosFilterOptions
        .filter(option => option.key === 'character_tags')

    return (
        <div className='tags-view'>
            <div className='tags-view__header'>
                <Button
                    modifier={tagsView === 'characters' ? 'active center' : 'center'}
                    text="Characters"
                    onClick={() => setTagsView('characters')}
                />
                <Button
                    modifier={tagsView === 'other' ? 'active center' : 'center'}
                    text="Other"
                    onClick={() => setTagsView('other')}
                />
            </div>
            <div className='tags-view__content'>
                {tagsView === 'characters' &&
                    <div className='tags-view__content__characters'>
                        {characterTags.map(character => {
                            const { short_name, weight_short_name } = character;
                            return (
                                <MoveTypeBadge
                                    key={character.id}
                                    moveType={short_name}
                                    value={character.value}
                                    modifier={selectedCharacterTags.find(sTag => sTag === character.value) ? weight_short_name : 'not-selected'}
                                    onClick={handleCharacterTagClick}
                                />
                            )
                        }
                        )}
                        <MoveTypeBadge
                            moveType="ALL"
                            modifier={selectedCharacterTags.length === CHARACTERS.length ? 'character' : 'not-selected'}
                            onClick={handleAllClick}
                        />
                    </div>
                }
                {tagsView === 'other' &&
                    <div className='tags-view__content__other-tags'>
                        {otherTags.map(tag =>
                            <MoveTypeBadge
                                key={tag.id}
                                value={tag.value}
                                moveType={tag.name}
                                modifier={selectedTags.find(sTag => sTag === tag.value) ? tag.short_name : 'not-selected'}
                                onClick={handleTagClick}
                            />
                        )}
                    </div>
                }
            </div>


        </div>
    )
}

export default TagsView;