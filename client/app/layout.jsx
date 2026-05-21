import { Poppins, Manrope, Space_Grotesk } from 'next/font/google'
import "./globals.css";
import { ToastContainer } from 'react-toastify';

// ---------- Meta -------------
export const metadata = {
    title: "Rexify | Premium Tech & Lifestyle",
    description: "Experience next-generation technology and lifestyle products with Rexify.",
};

// ---------- Fonts -------------
const poppins = Poppins({
    variable: '--font-poppins',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})
const manrope = Manrope({
    variable: '--font-manrope',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})
const space = Space_Grotesk({
    variable: '--font-space',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})


export default function Layout({ children }) {
    return (
        <html lang="en" className={`${poppins.variable} ${manrope.variable} ${space.variable}`}>
            <body>
                <main>
                    <ToastContainer />
                    {children}
                </main>
            </body>
        </html>
    );
} 
