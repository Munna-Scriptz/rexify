"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

const UserButton = ({ isNavbarWhite }) => {
    const [user, setUser] = useState("")
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/profile`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setUser(data.role)
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <>
            <Link
                href={!user ? "/auth/signin" : user === "admin" ? "/admin" : "/profile"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-all duration-300 group-hover:text-text-primary ${!user && "border"} ${isNavbarWhite && 'text-text-primary'}`}
            >
                {/* Avatar */}
                {
                    !user ?
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M11.47 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H4a.75.75 0 0 1 0-1.5h9.19l-1.72-1.72a.75.75 0 0 1 0-1.06" opacity={0.5}></path><path fill="currentColor" d="M13 5.75c-1.703 0-3.246.68-4.374 1.786a.75.75 0 0 1-1.05-1.072a7.75 7.75 0 1 1 0 11.071a.75.75 0 0 1 1.05-1.07A6.25 6.25 0 1 0 13 5.75"></path></svg>
                        :
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6wCUSmJEK9kC5KVqmQczHMH3OMcc_9BTTQ&s"
                            alt="user"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                }

                {/* Name */}
                <span className={`text-sm font-medium`}>
                    {!user ? "Sign In" : user === "admin" ? "Admin" : data.fullname}
                </span>

                {/* Icon */}
                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 5l2 2.333M9 19l6-7l-1.5-1.75"></path></svg>
            </Link >
        </>
    )
}

export default UserButton