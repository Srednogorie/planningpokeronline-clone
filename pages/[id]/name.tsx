import type { NextPage } from 'next'
import {ErrorMessage, Field, Form, Formik} from "formik"
import {getDocument, getNameCookieString, updateDocument} from "../../db/utils"
import {useRouter} from "next/router"
import Header from "../../components/Header"
import { getServerSideProps } from "./index"
import {Game} from "../../types"
import {includes} from "lodash";

interface NamePageProps {
    serverGame: Game
}
const Name: NextPage<NamePageProps> = ({serverGame}) => {
    const router = useRouter()
    return (
        <div className={"h-screen"}>
            <Header gameName={""}/>
            <main className={"h-5/6"}>
                <section className="h-full">
                    <div className="h-full flex justify-center items-center">
                        <div className="row w-10/12 md:w-9/12 lg:w-2/6">
                            <h1 className="text-center text-lg mb-12">Choose your display name</h1>
                            <Formik
                                initialValues={{player_name: ''}}
                                validate={async (values) => {
                                    const game = await getDocument("games", serverGame.id)
                                    const errors: { player_name?: string } = {}
                                    if (!values.player_name) {
                                        errors.player_name = 'Required'
                                    }
                                    if (game) {
                                        if (includes(game.players, values.player_name)) {
                                            errors.player_name = `Choose unique name. ${values.player_name} is already in the game.`
                                        }
                                    }
                                    return errors
                                }}
                                onSubmit={async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
                                    const game = await getDocument("games", serverGame.id)
                                    let gameData = {}
                                    if (game) {
                                        gameData = {
                                            players: [...game.players, values.player_name],
                                        }
                                    }
                                    await updateDocument(serverGame.id, gameData, "games")
                                    // await mutate('tasks/allTasks')
                                    // resetForm()
                                    // console.log(game.id)
                                    document.cookie = getNameCookieString(values.player_name, serverGame.id)
                                    await router.push(`/${serverGame.id}`)
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {({isSubmitting}) => (
                                    <Form>
                                        <Field
                                            type="text"
                                            name="player_name"
                                            placeholder="Your display Name"
                                            className="w-full border-2 border-gray-300 rounded-md px-3 py-3 font-bold focus: outline-blue-400"
                                        />
                                        <ErrorMessage name="player_name" component="div" className="text-red-400"/>
                                        <button disabled={isSubmitting} type="submit" className="w-full text-white mt-12 bg-blue-400 rounded-md px-2 py-3 font-bold text-md lg:text-xl">
                                            Continue to game
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export { getServerSideProps };

export default Name
