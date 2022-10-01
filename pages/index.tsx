import type {NextPage} from 'next'
import {ErrorMessage, Field, FieldAttributes, Form, Formik} from "formik"
import {createDocument} from "../db/utils"
import {useRouter} from "next/router"
import Header from "../components/Header"
import React, {useEffect} from "react"

const Home: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        document.getElementsByName("game_name")[0].focus()
        // following is optional
        // return () => {
        //     formik.resetForm()
        // }
    }, [])

    return (
        <div className="h-screen">
            <Header/>
            <main className="h-5/6">
                <section className="h-full">
                    <div className="h-full flex justify-center items-center">
                        <div className="row w-10/12 md:w-9/12 lg:w-2/6">
                            <h1 className="text-center text-lg mb-12">
                                Choose a name for your game.
                            </h1>
                            <Formik
                                initialValues={{game_name: ''}}
                                validate={values => {
                                    const errors: { game_name?: string } = {}
                                    if (!values.game_name) {
                                        errors.game_name = 'Required'
                                    }
                                    return errors
                                }}
                                onSubmit={async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
                                    const game: any = await createDocument(
                                        {
                                            name: values.game_name,
                                            players: [],
                                            turns: {
                                                1: {turnsRecord: {}, isFinished: false},
                                            }
                                        },
                                        "games"
                                    )
                                    await router.push(`${game.id}/name`)
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {({isSubmitting}) => (
                                    <Form>
                                        <ErrorMessage name="game_name" component="div" className="text-red-600"/>
                                        <Field
                                            type="text"
                                            name="game_name"
                                            placeholder="Game's Name"
                                            className="w-full border-2 border-gray-300 rounded-md px-3 py-3 mb-12 font-bold focus: outline-blue-400"
                                        />
                                        <button type="submit" disabled={isSubmitting}
                                                className="w-full text-white bg-blue-400 rounded-md px-2 py-3 font-bold text-xl">
                                            Create Game
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

export default Home
