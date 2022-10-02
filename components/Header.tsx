import Link from "next/link"
import React from "react"

interface HeaderProps {
    gameName?: string, pathName?: string
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="h-18 px-5 lg:px-10">
            <div className={`h-full row flex items-center my-3 
            ${(props.pathName === '/' || props.pathName === '/about') && 'justify-between'}`}
            >
                <div>
                    <Link href="/">
                        <a>
                            <svg width="40" height="40" viewBox="0 0 38 37" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M20.3049 0.717705C19.3268 -0.239235 17.7632 -0.239235 16.7851 0.717707L6.12224 11.1492L2.57284 14.6216C-0.857614 17.9776 -0.857615 23.4188 2.57284 26.7748C6.0033 30.1308 11.5652 30.1308 14.9956 26.7748L15.6282 26.1559C14.7727 25.4114 14.2081 24.3412 14.1278 23.1384L9.40322 24.0187C8.18069 24.2466 7.40381 22.7519 8.29274 21.8822L14.1179 16.1834V11.9829C14.1179 9.55722 16.0843 7.59081 18.51 7.59081C20.9357 7.59081 22.9021 9.55723 22.9021 11.9829V16.1834L28.7273 21.8822C29.6163 22.7519 28.8394 24.2466 27.6168 24.0187L22.8923 23.1384C22.8131 24.3238 22.2635 25.3805 21.4287 26.1235L22.0944 26.7748C25.5248 30.1308 31.0867 30.1308 34.5172 26.7748C37.9476 23.4188 37.9476 17.9776 34.5172 14.6215L20.3049 0.717705ZM18.5101 15.5706C19.723 15.5706 20.7062 14.6087 20.7062 13.4222C20.7062 12.2357 19.723 11.2738 18.5101 11.2738C17.2973 11.2738 16.3141 12.2357 16.3141 13.4222C16.3141 14.6087 17.2973 15.5706 18.5101 15.5706ZM11.1954 33.9471C10.6368 34.1106 10.2156 34.6 10.2156 35.1819C10.2156 35.8436 10.7519 36.3799 11.4136 36.3799H25.351C26.0189 36.3799 26.5603 35.8385 26.5603 35.1706C26.5603 34.5867 26.14 34.0947 25.581 33.9262C24.2634 33.529 23.023 32.8247 21.9795 31.8134L19.2991 29.2156C18.8111 28.7426 18.0357 28.7426 17.5476 29.2156L14.8672 31.8134C13.8052 32.8427 12.5392 33.5539 11.1954 33.9471Z"
                                      fill="#3993FF"/>
                            </svg>
                        </a>
                    </Link>
                </div>
                {props.gameName && (
                    <div className={"ml-4"}>
                        <h2 className="font-bold text-center text-xl">{props.gameName}</h2>
                    </div>
                )}
                {(props.pathName === '/' || props.pathName === '/about') &&
                    <Link href="/about">
                        <a className={"cursor-pointer has-tooltip ml-5"}>
                            <span className='tooltip rounded shadow-lg p-1 bg-[#264653] text-white mt-8 opacity-70 text-xs'>About</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="#3993FE" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header
