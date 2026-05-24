import { Poppins, Manrope, Space_Grotesk } from 'next/font/google'
import "./globals.css";
import { ToastContainer } from 'react-toastify';

// ---------- Meta -------------

export const metadata = {
    metadataBase: new URL("https://rexifyshop.vercel.app"),

    title: {
        default: "Rexify | Buy Premium Smartphones & Authentic Tech Accessories",
        template: "%s | Rexify",
    },

    description: "Discover the ultimate smartphone shopping experience at Rexify. Buy authentic iPhones, Samsung Galaxy, flagship devices, and premium tech accessories in Bangladesh with official warranty.",

    keywords: [
        "smartphone ecommerce bd",
        "buy authentic iphone bangladesh",
        "samsung flagship price in bd",
        "premium mobile shop dhaka",
        "original apple accessories bd",
        "latest phone price in bangladesh",
        "rexify shop",
        "gadget and gear bangladesh"
    ],

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    openGraph: {
        title: "Rexify | The Future of Phone Retail & Premium Tech",
        description: "Upgrade to your next flagship phone. Shop authentic smartphones, wireless audio, and tech accessories with fast delivery and trusted warranty across Bangladesh.",
        url: "https://rexifyshop.vercel.app",
        siteName: "Rexify",
        images: [
            {
                url: "/assets/rexifyBanner.jpg",
                width: 1200,
                height: 630,
                alt: "Rexify Premium Phone E-Commerce Banner",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Rexify | Premium Phone E-Commerce",
        description: "Buy authentic smartphones and elite electronics in Bangladesh. Experience future-proof tech curation.",
        images: ["/assets/rexifyBanner.jpg"],
    },

    icons: {
        icon: [
            { url: "/assets/logoSmall.png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
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
