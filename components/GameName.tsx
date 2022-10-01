import React from "react"

interface HeaderProps {
    gameName: string
}

const GameName: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h2 className="font-bold text-center text-xl my-4">{props.gameName}</h2>
        </header>
    )
}

export default GameName
