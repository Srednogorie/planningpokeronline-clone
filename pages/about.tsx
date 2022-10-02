import {NextPage} from "next"
import Image from 'next/image'
import Header from "../components/Header"

const About: NextPage = () => {
    return (
        <div>
            <Header pathName='/about'/>
            <div className={"max-w-[750px] mx-auto"}>
                <div className={"text-center mt-12 mx-6"}>
                    This is very close copy of <a href="https://planningpokeronline.com/" target="_blank" rel="noreferrer" className={"underline"}>planningpokeronline.com</a> built
                    as part of Cloud Firestore listeners exercise.
                    While the game works as expected, for any other purposes please use the original.
                    It has way more features, remarkable UX and it&apos;s initially free.
                </div>
                <div className="flex flex-col items-center mb-auto mx-4 mt-6">
                    <div className="italic text-[#F4A261] text-center my-6">
                        <div className={"flex items-center"}>
                            <Image src="/octocat.jpg" alt="Picture of the author" width={30} height={30}/>
                            <a href="https://github.com/Srednogorie/weekly-search" target="_blank" rel="noreferrer" className={"underline text-gray-600 ml-2"}>
                                github.com/Srednogorie/weekly-search
                            </a>
                        </div>
                    </div>
                    <h1 className="text-gray-700 text-2xl pt-3">Frontend</h1>
                    <p className="italic text-gray-600 text-center">React, NextJs, Typescript, Tailwind, Formik</p>
                    <a href="https://heroicons.com/" target={"_blank"} rel={"noreferrer"} className={"underline text-gray-600"}>heroicons.com</a>
                    <h1 className="text-gray-700 text-2xl pt-3">Backend</h1>
                    <p className="italic text-gray-600 text-center">Firebase</p>
                    <h1 className="text-gray-700 text-2xl pt-3">Deployment</h1>
                    <p className="italic text-gray-600 text-center">Vercel</p>
                </div>
            </div>
        </div>

    )
}

export default About;
