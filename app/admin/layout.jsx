"use client"
import "../globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/Header";


export default function Layout({ children }) {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter(Boolean);

    return (
        <section className='flex items-start'>
            <Navbar />

            {/* -------------------- Right side content and header -------------------- */}
            <aside className='flex flex-col w-full '>
            <Header pageName={pathnames} />
                <div className='px-[20px] pt-5'>
                    {children}
                </div>
            </aside>
        </section>
    );
} 
