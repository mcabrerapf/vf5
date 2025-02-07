import './TagsView.scss';
import React, { useState } from 'react';
import { CHARACTERS } from '../../../../constants';
import MoveTypeBadge from '../../../MoveTypeBadge';
import Button from '../../../Button';
import { COMBO_FILTER_OPTIONS } from '../../../../constants/CHARACTERS';
import { capitalizeFirstLetter } from '../../../../helpers';

const TagsView = ({
    selectedCharacterTags,
    selectedTags,
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
    const otherTags = COMBO_FILTER_OPTIONS.filter(option => option.prefix !== 'character');
    const characterTags = COMBO_FILTER_OPTIONS.filter(option => option.prefix === 'character');
    
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
                        {characterTags.map(character =>
                            <MoveTypeBadge
                                key={character.id}
                                moveType={capitalizeFirstLetter(character.id)}
                                value={character.id}
                                modifier={selectedCharacterTags.find(sTag => sTag === character.id) ? 'character' : 'not-selected'}
                                onClick={handleCharacterTagClick}
                            />
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
                                value={tag.id}
                                moveType={tag.name}
                                modifier={selectedTags.find(sTag => sTag === tag.id) ? tag.id : 'not-selected'}
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