import React, { useState } from "react";
import './TagsView.scss';
import MoveTypeBadge from "../../../MoveTypeBadge";
import Button from "../../../Button";

const TagsView = ({
    selectedFilters,
    filterOptions,
    allCharactersSelected,
    handleCharacterClick,
    handleAllClick,
    handleOtherTagClick
}) => {
    const [tagsView, setTagsView] = useState('characters');
    const characterTags = [];
    const attackLevelTags = [];
    const moveCategoryTags = [];
    const otherTags = [];
    filterOptions
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
                            const isSelected = selectedFilters.find(sFilter => sFilter.value === character.value);
                            const modifier = isSelected ? character.weight_short_name : 'not-selected';

                            return (
                                <MoveTypeBadge
                                    key={character.id}
                                    modifier={modifier}
                                    value={character.value}
                                    moveType={character.short_name}
                                    onClick={handleCharacterClick}
                                />
                            )
                        })}
                        <MoveTypeBadge
                            modifier={allCharactersSelected ? 'character' : 'not-selected'}
                            moveType={'ALL'}
                            onClick={handleAllClick}
                        />
                    </div>
                }
                {tagsView === 'attack_levels' &&
                    <div className='tags-view__content__other-tags'>
                        {attackLevelTags.map(tag =>
                            <MoveTypeBadge
                                key={tag.id}
                                value={tag.value}
                                moveType={tag.name}
                                modifier={selectedFilters.find(sTag => sTag.value === tag.value) ? tag.value : 'not-selected'}
                                onClick={handleOtherTagClick}
                            />
                        )}
                    </div>
                }
                {tagsView === 'move_categories' &&
                    <div className='tags-view__content__other-tags'>
                        {moveCategoryTags.map(tag =>
                            <MoveTypeBadge
                                key={tag.id}
                                value={tag.value}
                                moveType={tag.name}
                                modifier={selectedFilters.find(sTag =>  sTag.value === tag.value) ? 'active' : 'not-selected'}
                                onClick={handleOtherTagClick}
                            />
                        )}
                    </div>
                }
                {tagsView === 'other' &&
                    <div className='tags-view__content__other-tags'>
                        {otherTags.map(tag =>
                            <MoveTypeBadge
                                key={tag.id}
                                moveType={tag.name}
                                value={tag.value}
                                modifier={selectedFilters.find(sTag => sTag.value === tag.value) ? tag.value : 'not-selected'}
                                onClick={handleOtherTagClick}
                            />
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default TagsView;