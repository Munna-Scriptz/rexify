import React from 'react'

const PageHeader = ({ topText, headerText, colorText, bottomText }) => {
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

export default PageHeader