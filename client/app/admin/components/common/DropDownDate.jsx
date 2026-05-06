import React, { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { FiBarChart2 } from 'react-icons/fi';
import { BiChevronDown, BiTrendingUp } from 'react-icons/bi';

const DropDownDate = ({ onSelect }) => {
    const [selected, setSelected] = useState("This Week");
    const [active, setActive] = useState(false)

    const menuItems = [
        { name: "This Week", icon: CiCalendarDate },
        { name: "This Month", icon: FiBarChart2 },
        { name: "Last Quarter", icon: BiTrendingUp },
    ];

    const handleItemClick = (item) => {
        onSelect(item)
    }

    // ---------------------- close dropdown ----------------------
    const dropdownRef = useRef(null)
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActive(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    
    return (
        <div className="relative inline-block text-left z-10" ref={dropdownRef}>
            <button onClick={() => setActive(!active)} className={`text-sm text-subTxt font-medium flex items-center justify-center gap-2 cursor-pointer hover:text-colBlack duration-300 p-2 rounded-lg transition-colors bg-white hover:bg-gray-100 focus:outline-none focus:bg-primary/12 focus:text-primary`}>
                {selected} <BiChevronDown className={`text-lg transition-transform duration-300 ${active ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* The Dropdown Menu */}
            <div className={` ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white  ring-1 ring-gray-300 ring-opacity-5 divide-y divide-gray-100 transform origin-top-right transition-all duration-200 ease-out`}>
                <div className="p-2">
                    {menuItems.map((item) => (
                        <button key={item.name} onClick={() => { setActive(!active), setSelected(item.name), handleItemClick(item.name) }} className="group flex items-center w-full rounded-lg p-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-primary transition-colors duration-150" ><item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary transition-colors duration-150" aria-hidden="true" />{item.name}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropDownDate