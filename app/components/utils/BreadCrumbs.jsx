import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const BreadCrumbs = ({ to, name, absolute }) => {
    return (
        <Link href={to} className={`flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 group ${absolute && "absolute top-6 left-6"}`}>
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to {name}</span>
        </Link>
    )
}

export default BreadCrumbs