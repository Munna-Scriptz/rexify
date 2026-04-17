import Link from 'next/link'

const Header = ({ header, text, linkText, linkPath }) => {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-semibold text-coil mb-2 text-center md:text-left">
                {header}
            </h1>
            <p className="text-coil text-sm md:text-base mb-8 md:mb-12 text-center md:text-left">
                {text}
                <Link href={linkPath} className="text-text-primary font-semibold underline underline-offset-2 ml-1">
                    {linkText}
                </Link>
            </p>
        </>
    )
}

export default Header