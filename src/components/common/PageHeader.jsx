import { Heart } from 'lucide-react'
import React from 'react'

export const PageHeader = ({ topText, headerText, colorText, bottomText }) => {
    return (
        <section className="bg-surface py-20 border-b border-border">
            <div className="container text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    {topText}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-space mb-6">
                    {headerText} <span className="text-accent">{colorText}</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                    {bottomText}
                </p>
            </div>
        </section>
    )
}

export const AboutHeader = () => {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 -z-10"></div>
            <div className="container flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    We are Rexify
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                    Redefining the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-blue-600">
                        Digital Experience
                    </span>
                </h1>
                <p className="max-w-2xl text-lg text-text-secondary md:text-xl leading-relaxed">
                    We build tools that empower creators, developers, and businesses to scale
                    without boundaries. Simple, powerful, and built for the future.
                </p>
            </div>
        </section>
    )
}

export const WishlistHeader = () => {
    return (
        <div className="flex flex-col items-center mb-16">
            <div className="inline-flex items-center justify-center text-accent mb-6 animate-fade-in">
                <span className="relative flex h-15 w-15 items-center justify-center">
                    {/* Ping animation */}
                    <span className="animate-ping absolute inline-flex h-full w-full opacity-40">
                        <Heart className="w-15 h-15" strokeWidth={1} />
                    </span>

                    {/* Icon container */}
                    <span className="relative inline-flex items-center justify-center">
                        <Heart className="w-15 h-15" strokeWidth={1} />
                    </span>
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-space mb-6 text-text-primary">
                My <span className="text-accent">wishlist</span>
            </h1>

            {/* Tabs / Sub-nav */}
            <div className="flex items-center gap-8 md:text-sm text-xs font-medium text-text-muted border-b border-border pb-4 w-full md:w-auto justify-center">
                <button className="hover:text-text-primary transition-colors">Create a wishlist</button>
                <button className="text-text-primary border-b-2 border-text-primary pb-4 -mb-4.5">Your wishlists</button>
                <button className="hover:text-text-primary transition-colors">Search wishlist</button>
            </div>
        </div>
    )
}