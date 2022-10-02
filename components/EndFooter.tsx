import React, {useEffect, useState} from "react"
import { sum, round, isInteger } from "lodash"
import {Game} from "../types";

interface EndFooterProps {
    localGame: Game
}
const EndFooter: React.FC<EndFooterProps> = ({localGame}) => {
    const [average, setAverage] = useState(0)
    const [resultMap, setResultMap] = useState({})
    useEffect(() => {
        const latestTurn = Math.max(...Object.keys(localGame.turns).map(Number))
        const counts: {[P: string]: number} = {}
        const records = Object.values(localGame.turns[latestTurn].turnsRecord)
        const countsArray = records.map(
            (record) => parseFloat(record as string)
        ).filter((record) => !isNaN(record))
        records.forEach(function (x) { counts[x as string] = (counts[x as string] || 0) + 1})
        setResultMap(counts)
        setAverage(round(sum(countsArray) / countsArray.length, 1))
    }, [localGame.players.length, localGame.turns])
    return (
        <footer>
            <div className="flex justify-center gap-x-12 mb-6 mt-3">
                <div>
                    <p className="text-gray-500 mb-2">Average:</p>
                    <h2 className="font-bold text-3xl text-center">{average}</h2>
                </div>
            </div>
            <section className="w-full overflow-x-scroll mx-auto rounded-md hide-scrollbar">
                <div className="w-fit mx-auto rounded-md h-28 flex justify-center items-center gap-6 px-3 game-cards-section">
                    {
                        Object.entries(resultMap).map(([k, v]) => {
                            return (
                                <div key={k}>
                                    <div className="h-14 w-9 rounded-md border-2 border-black flex justify-center items-center text-xl text-bold hover:bg-black hover:text-white hover:-mt-5">{k}</div>
                                    <p className="font-bold"><small>{`${v} Vote`}</small></p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </footer>
    )
}

export default EndFooter
