"use client"
import Link from 'next/link'
import { useState } from 'react'

const UserButton = ({ isNavbarWhite }) => {
    const [user, setUser] = useState("user")


    return (
        <>
            <Link
                href={!user ? "/auth/signin" : user === "admin" ? "/admin" : "/profile"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-all duration-300 group-hover:text-text-primary ${!user && "border"} ${isNavbarWhite && 'text-text-primary'}`}
            >
                {/* Avatar */}
                {
                    !user ?
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 `} fill="none" viewBox="0 0 24 24" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.364 6.636M15 11h4m0 0v4m0-4l4" /></svg>
                        :
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6wCUSmJEK9kC5KVqmQczHMH3OMcc_9BTTQ&s"
                            alt="user"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                }

                {/* Name */}
                <span className={`text-sm font-medium`}>
                    {!user ? "Sign In" : user === "admin" ? "Admin" : "John Doe"}
                </span>

                {/* Icon */}
                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 5l2 2.333M9 19l6-7l-1.5-1.75"></path></svg>
            </Link >
        </>
    )
}

export default UserButton