import React, { useState } from 'react';
import { CHARACTERS } from '../../../../constants';
import Button from '../../../Button';

const TagsView = ({
    selectedCharacterTags,
    selectedTags,
    combosFilterOptions,
    setSelectedTags,
    setSelectedCharacterTags
}) => {
    const [tagsView, setTagsView] = useState('characters');

    const handleCharacterTagClick = ({ target: { value } }) => {
        let updatedTags;
        const filteredTags = selectedCharacterTags.filter(sChar => sChar !== value);
        if (filteredTags.length === selectedCharacterTags.length) {
            updatedTags = [
                ...selectedCharacterTags,
                value
            ];

        } else {
            updatedTags = filteredTags;
        }
        setSelectedCharacterTags(updatedTags);
    }

    const handleAllClick = () => {
        let updatedTags;
        if (selectedCharacterTags.length !== CHARACTERS.length) {
            updatedTags = CHARACTERS.map(character => character.id);
        } else {
            updatedTags = [];
        }
        setSelectedCharacterTags(updatedTags);
    }

    const handleTagClick = ({ target: { value } }) => {
        let updatedTags;
        const filteredTags = selectedTags.filter(sChar => sChar !== value);
        if (filteredTags.length === selectedTags.length) {
            updatedTags = [
                ...selectedTags,
                value
            ];

        } else {
            updatedTags = filteredTags;
        }
        setSelectedTags(updatedTags);
    }


    const characterTags = [];
    const attackLevelTags = [];
    const moveCategoryTags = [];
    const otherTags = [];
    combosFilterOptions
        .forEach(option => {
            if (option.id.includes('character_tags/')) characterTags.push(option);
            if (option.id.includes("attack_level/")) attackLevelTags.push(option);
            if (option.id.includes("move_category/")) moveCategoryTags.push(option);
            if (option.id.includes("other/")) otherTags.push(option);
        })

    return (
        <div className='tags-view'>
            <div className='tags-view__header'>
                <Button
                    modifier={tagsView === 'characters' ? 'active center' : 'center'}
                    text="Characters"
                    onClick={() => setTagsView('characters')}
                />
                <Button
                    modifier={tagsView === 'attack_levels' ? 'active center' : 'center'}
                    text="Attack Levels"
                    onClick={() => setTagsView('attack_levels')}
                />
                <Button
                    modifier={tagsView === 'move_categories' ? 'active center' : 'center'}
                    text="Move Categories"
                    onClick={() => setTagsView('move_categories')}
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
                                <Button
                                    key={character.id}
                                    text={short_name}
                                    value={character.value}
                                    modifier={selectedCharacterTags.find(sTag => sTag === character.value) ? weight_short_name : ''}
                                    onClick={handleCharacterTagClick}
                                />
                            )
                        }
                        )}
                        <Button
                            text="ALL"
                            modifier={selectedCharacterTags.length === CHARACTERS.length ? 'character' : ''}
                            onClick={handleAllClick}
                        />
                    </div>
                }
                {tagsView === 'attack_levels' &&
                    <div className='tags-view__content__other-tags'>
                        {attackLevelTags.map(tag =>
                            <Button
                                key={tag.id}
                                value={tag.value}
                                text={tag.name}
                                modifier={selectedTags.find(sTag => sTag === tag.value) ? `move-type ${tag.value}` : 'not-selected'}
                                onClick={handleTagClick}
                            />
                        )}
                    </div>
                }
                {tagsView === 'move_categories' &&
                    <div className='tags-view__content__other-tags'>
                        {moveCategoryTags.map(tag =>
                            <Button
                                key={tag.id}
                                value={tag.value}
                                text={tag.name}
                                modifier={selectedTags.find(sTag => sTag === tag.value) ? 'active' : ''}
                                onClick={handleTagClick}
                            />
                        )}
                    </div>
                }
                {tagsView === 'other' &&
                    <div className='tags-view__content__other-tags'>
                        {otherTags.map(tag =>
                            <Button
                                key={tag.id}
                                value={tag.value}
                                text={tag.name}
                                modifier={selectedTags.find(sTag => sTag === tag.value) ? `move-type ${tag.value}` : ''}
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