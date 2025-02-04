import React from "react";
import './TagsView.scss';
import { CHARACTERS, MOVE_LEVEL_MATCHES } from "../../../../constants";
import CharacterBadge from "../../../CharacterBadge";
import MoveTypeBadge from "../../../MoveTypeBadge";

const TagsView = ({
    selectedFilters,
    allCharactersSelected,
    handleCharacterClick,
    handleAllClick,
    handleOtherTagClick
}) => {
    const otherTags = [...new Set(Object.keys(MOVE_LEVEL_MATCHES).map(key => MOVE_LEVEL_MATCHES[key]))];

    return (
        <div className='tags-view'>
            <div className='tags-view__characters'>
                {CHARACTERS.map(character => {
                    const isSelected = selectedFilters.includes(`character/${character.id}`);
                    const modifier = isSelected ? '' : 'not-selected';

                    return (
                        <CharacterBadge
                            key={character.id}
                            modifier={modifier}
                            character={character.id}
                            onClick={handleCharacterClick}
                        />
                    )
                })}
                <CharacterBadge
                    modifier={allCharactersSelected ? '' : 'not-selected'}
                    character={'ALL'}
                    onClick={handleAllClick}
                />
            </div>
            <div className='tags-view__separator' />
            <div className='tags-view__other-tags'>
                {otherTags.map(tag =>
                    <MoveTypeBadge
                        key={tag}
                        moveType={tag}
                        modifier={selectedFilters.includes(`other/${tag}`) ? '' : 'not-selected'}
                        onClick={handleOtherTagClick}
                    />
                )}
                <MoveTypeBadge
                    moveType="side"
                    modifier={selectedFilters.includes('other/side') ? '' : 'not-selected'}
                    onClick={handleOtherTagClick}
                />
                <MoveTypeBadge
                    moveType="ch"
                    modifier={selectedFilters.includes('other/ch') ? '' : 'not-selected'}
                    onClick={handleOtherTagClick}
                />
                <MoveTypeBadge
                    moveType="wall"
                    modifier={selectedFilters.includes('other/wall') ? '' : 'not-selected'}
                    onClick={handleOtherTagClick}
                />
            </div>
        </div>
    )
}

export default TagsView;