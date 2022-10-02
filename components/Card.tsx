import React from "react"
import {Game} from "../types"

interface CardProps {
    choiceState: {[P: number]: number}, gameOver: boolean, localGame: Game, playerNum: number
}
const Card: React.FC<CardProps> = (props) => {
    return (
        <div id={`${props.playerNum}`}>
            <div className={
                `flex items-center justify-center text-white mx-auto rounded-md bg-slate-200 w-10 h-16 
                ${(props.choiceState[props.playerNum] && !props.gameOver) && 'bg-blue-500 card-background'} 
                ${(props.choiceState[props.playerNum] && props.gameOver) && 'text-xl text-bold text-blue-500 border-2 border-blue-500 !bg-gray-100'}`
            }>
                {(props.choiceState[props.playerNum] && props.gameOver) && props.choiceState[props.playerNum]}
            </div>
            <p className="font-bold text-center"><small>{props.localGame.players[props.playerNum]}</small></p>
        </div>
    )
}

export default Card
