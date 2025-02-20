import React from "react"
import MoveCommand from "../MoveCommand"

const TextWithCommand = ({
    content
}) => {
    if (!content) return null;
    return content.map((noteContent, i) => {
        if (Array.isArray(noteContent)) return (
            <MoveCommand
                key={i}
                command={noteContent}
            />
        )
        return (
            <span
                key={i}
            >
                {noteContent}
            </span>
        )
    })
}

export default TextWithCommand;