import React from "react"
import MoveCommand from "../MoveCommand"

const TextWithCommand = ({
    content
}) => {
    return content.map((noteContent) => {
        if (Array.isArray(noteContent)) return (
            <MoveCommand
                command={noteContent}
            />
        )
        return (
            <span>
                {noteContent}
            </span>
        )
    })
}

export default TextWithCommand;