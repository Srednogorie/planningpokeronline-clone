import React, {useEffect, useState} from "react"
import {updateDocument} from "../db/utils"
import {Game} from "../types"

interface CenterProps {
    localGame: Game, playerName: string,
}
const Footer: React.FC<CenterProps> = ({localGame, playerName}) => {
    const sequence = ["0.5", "1", "2", "3", "5", "8", "13", "21", "34", "?"]
    const [choice, setChoice] = useState("")

    const handleChoiceChange = async (choiceString: string) => {
        const latestTurn = Math.max(...Object.keys(localGame.turns).map(Number))
        if (choice && choice === choiceString) {
            delete localGame.turns[latestTurn].turnsRecord[playerName]
            setChoice("")
            await updateDocument(
                localGame.id,
                {
                    [`turns.${latestTurn}.turnsRecord`]: {...localGame.turns[latestTurn].turnsRecord}
                },
                'games'
            )
        } else {
            setChoice(choiceString)
            await updateDocument(
                localGame.id,
                {
                    [`turns.${latestTurn}.turnsRecord`]: {...localGame.turns[latestTurn].turnsRecord, [playerName]: choiceString}
                },
                'games'
            )
        }
    }

    useEffect(() => {
        const latestTurn = Math.max(...Object.keys(localGame.turns).map(Number))
        if (playerName in localGame.turns[latestTurn].turnsRecord) {
            setChoice(localGame.turns[latestTurn].turnsRecord[playerName])
        }
    }, [localGame.turns, playerName])
    return (
        <footer>
            <section className="w-full overflow-x-scroll mx-auto rounded-md hide-scrollbar">
                <div className="w-fit mx-auto rounded-md h-28 flex justify-center items-center gap-6 overflow-x-scroll px-3 game-cards-section">
                    {sequence.map((member) =>
                        <div key={member} onClick={() => handleChoiceChange(member)} className={
                            `h-20 w-12 rounded-md border-2 border-blue-500 flex justify-center items-center text-xl text-blue-500 text-bold cursor-grab 
                            ${choice === member ? 'bg-blue-500 !text-white -mt-5' : 'hover:bg-blue-500 hover:text-white hover:-mt-5'}`
                        }>
                            {member}
                        </div>
                    )}
                </div>
            </section>
        </footer>
    )
}

export default Footer
