import React from "react"
import {updateDocument} from "../db/utils"

interface CenterProps {
    currentVote: boolean, gameOver: boolean, currentTurn: number, gameId: string
}
const Center: React.FC<CenterProps> = ({currentVote, gameOver, currentTurn, gameId}) => {
    const handleRevealCards = async () => {
        await updateDocument(
            gameId,
            {
                [`turns.${currentTurn}.isFinished`]: true
            },
            'games'
        )
    }
    const handleNewVoting = async () => {
        await updateDocument(
            gameId,
            {
                [`turns.${currentTurn + 1}.turnsRecord`]: {}
            },
            'games'
        )
    }
    const renderComponent = () => {
        if (gameOver) {
            return <button id="btn-a" onClick={handleNewVoting} className="w-3/5 h-auto text-white bg-gray-700 rounded-md px-2 py-3 font-bold text-sm">New voting</button>
        } else if (currentVote) {
            return <button id="btn-a" onClick={handleRevealCards} className="w-3/5 h-auto text-white bg-blue-400 rounded-md px-2 py-3 font-bold text-sm">Reveal Cards</button>
        }
        return <p className="text-center lg:text-lg">Pick your cards</p>
    }
    return (
        <div className="h-40 flex justify-center items-center bg-blue-100  rounded-3xl lg:py-2 mb-6">
            {renderComponent()}
        </div>
    )
}

export default Center
