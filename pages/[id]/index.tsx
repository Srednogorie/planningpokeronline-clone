import {GetServerSideProps, NextPage} from "next"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Center from "../../components/Center"
import {clientFirestore} from "../../db/firebase_client"
import {doc, onSnapshot} from "firebase/firestore"
import {deleteDocument, getDocument, updateDocument} from "../../db/utils"
import {useEffect, useState} from "react"
import cookies from "next-cookies"
import {isEmpty, without, includes} from "lodash"
import EndFooter from "../../components/EndFooter"
import useCopyToClipboard from "../../hooks"
import Card from "../../components/Card"
import toast  from "react-hot-toast"
import {Timestamp} from "@firebase/firestore"
import {Game} from "../../types"
import {useRouter} from 'next/router'


interface GamePageProps {
    serverGame: Game, playerName: string
}
const Game: NextPage<GamePageProps> = ({serverGame, playerName}) => {
    const [choiceState, setChoiceState] = useState({})
    const [numPlayers, setNumPlayers] = useState(0)
    const [localGame, setLocalGame] = useState<Game>({} as Game)
    const [currentVote, setCurrentVote] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [value, copy] = useCopyToClipboard()

    const router = useRouter()

    const handleGameUpdate = (data: Game) => {
        if (!data.created) {
            router.push("/").then()
            return
        }
        const latestTurn = Math.max(...Object.keys(data.turns).map(Number))
        const playersNumber = data.players.length
        setLocalGame(data)
        setNumPlayers(playersNumber)
        setCurrentTurn(latestTurn)

        if (data.players.length >= 1) {
            const playersArray = [...Array(data.players.length).keys()]
            for (const x of playersArray) {
                if (data.players[x] in data.turns[latestTurn].turnsRecord) {
                    setChoiceState((prevState) => ({...prevState, [x]: data.turns[latestTurn].turnsRecord[data.players[x]]}))
                } else {
                    setChoiceState((prevState) => ({...prevState, [x]: undefined}))
                }
            }
        }

        if (isEmpty(data.turns[latestTurn].turnsRecord)) {
            setCurrentVote(false)
        } else {
            setCurrentVote(true)
        }
        if (data.turns[latestTurn].isFinished) {
            setGameOver(true)
        } else {
            setGameOver(false)
        }
    }

    const handleFooterRender = () => {
        if (!isEmpty(localGame)) {
            if (gameOver) {
                return <EndFooter localGame={localGame}/>
            }
            return <Footer localGame={localGame} playerName={playerName}/>
        }
    }

    const handleInvitePlayer = async () => {
        await copy(`https://planningpokeronline-clone.vercel.app/${serverGame.id}`)
        toast.success(
            'Invitation link copied',
            {position: "top-right", duration: 3000, icon: "📨", className: "toast-style"}
        )
    }

    const handleTabClosing = async () => {
        const existing_players = await getDocument("games", serverGame.id)
        let gameData = {}
        if (existing_players) {
            gameData = {
                players: without([...existing_players.players], playerName),
            }
        }
        await updateDocument(serverGame.id, gameData, "games")
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleTabClosing)
        return () => {
            window.removeEventListener('beforeunload', handleTabClosing)
        }
    })

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(clientFirestore, "games", serverGame.id),
            (doc) => {
                handleGameUpdate({...doc.data(), id: doc.id} as Game)
                console.log(doc.data())
            }
        )
        return () => unsubscribe()
    }, [serverGame.id])

    const bodyHeight = gameOver ? 'h-[calc(100vh-10.0rem)]' : 'h-[calc(100vh-3.0rem)]'
    return (
        <div className={bodyHeight}>
            <Header gameName={serverGame.name}/>
            <main className="h-4/5 md:mt-0 bg-gray-100">
                <div className="text-center pt-12">
                    {numPlayers === 1 && <p className={`lg:text-lg mb-2 md:mb-0`}>Feeling lonely? 😴</p>}
                    <h2>
                        <span onClick={handleInvitePlayer} className={`text-blue-400 text-md lg:text-xl font-bold hover:cursor-pointer`}>
                            Invite players
                        </span>
                    </h2>
                </div>
                <section className="h-full flex items-center">
                    <div className="container mx-auto rounded-md mb-16 w-full lg:w-3/6">
                        <div className="grid grid-cols-3 justify-center">
                            <div/>
                            <div className="flex justify-center gap-6 lg:gap-x-12 mb-6">
                                {numPlayers >= 7 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={6}/>}
                                {numPlayers >= 4 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={3}/>}
                                {numPlayers >= 8 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={7}/>}
                            </div>
                            <div/>

                            <div className="flex justify-end items-center mr-6">
                                {numPlayers >= 1 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={0}/>}
                            </div>

                            <Center currentVote={currentVote} gameOver={gameOver} currentTurn={currentTurn} gameId={serverGame.id}/>

                            <div className="flex items-center ml-6">
                                {numPlayers >= 2 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={1}/>}
                            </div>

                            <div/>
                            <div className="flex justify-center gap-6 lg:gap-x-12">
                                {numPlayers >= 5 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={4}/>}
                                {numPlayers >= 3 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={2}/>}
                                {numPlayers >= 6 && <Card gameOver={gameOver} choiceState={choiceState} localGame={localGame} playerNum={5}/>}
                            </div>
                            <div/>
                        </div>
                    </div>
                </section>
            </main>
            {!isEmpty(localGame) && handleFooterRender()}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id
    const allCookies = cookies(context)
    let playerName = allCookies[`${id}__Na`]

    let serverGame = await getDocument('games', id as string)
    if (serverGame) {
        if ((serverGame.created.seconds + 1800) < Timestamp.now().seconds) {
            await deleteDocument('games', id as string)
            serverGame = undefined
        }
    }
    if (!serverGame || serverGame.players.length === 8) {
        return {
            redirect: {permanent: true, destination: '/'}
        }
    }
    if (playerName) {
        if (!includes(serverGame.players, playerName)) {
            let gameData = {
                players: [...serverGame.players, playerName],
            }
            await updateDocument(id as string, gameData, "games")
            serverGame = await getDocument('games', id as string)
        }
        if (!context.resolvedUrl.endsWith(id as string)) {
            return {
                redirect: {permanent: true, destination: `/${id}`}
            }
        }
    } else {
        if (!context.resolvedUrl.endsWith('name')) {
            return {
                redirect: {permanent: true, destination: `/${id}/name`}
            }
        }
    }
    if (serverGame) {
        serverGame.created = serverGame.created.seconds
    }
    if (context.resolvedUrl.endsWith('name')) {
        return {props: {serverGame}}
    }
    return {props: {serverGame, playerName, allCookies}}
}

export default Game
