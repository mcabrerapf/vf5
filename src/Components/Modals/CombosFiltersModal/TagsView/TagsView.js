import React, { useState } from "react";
import './TagsView.scss';
import { CHARACTERS, COMBO_FILTER_OPTIONS } from "../../../../constants";
import MoveTypeBadge from "../../../MoveTypeBadge";
import Button from "../../../Button";
import { capitalizeFirstLetter } from "../../../../helpers";

const TagsView = ({
    selectedFilters,
    allCharactersSelected,
    handleCharacterClick,
    handleAllClick,
    handleOtherTagClick
}) => {
    const [tagsView, setTagsView] = useState('characters');
    const otherTags = COMBO_FILTER_OPTIONS.filter(filter => filter.prefix === 'tags');

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
                        {CHARACTERS.map(character => {
                            const isSelected = selectedFilters.find(sFilter=> sFilter.id === character.id);
                            const modifier = isSelected ? 'character' : 'not-selected';

                            return (
                                <MoveTypeBadge
                                    key={character.id}
                                    modifier={modifier}
                                    value={character.id}
                                    moveType={capitalizeFirstLetter(character.id)}
                                    onClick={handleCharacterClick}
                                />
                            )
                        })}
                        <MoveTypeBadge
                            modifier={allCharactersSelected ? '' : 'not-selected'}
                            moveType={'ALL'}
                            onClick={handleAllClick}
                        />
                    </div>
                }

                {tagsView === 'other' &&
                    <div className='tags-view__content__other-tags'>
                         {otherTags.map(tag =>
                            <MoveTypeBadge
                                key={tag.id}
                                moveType={tag.name}
                                value={tag.id}
                                modifier={selectedFilters.find(sTag => sTag.id === tag.id) ? tag.id : 'not-selected'}
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