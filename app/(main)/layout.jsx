import "../globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout({ children }) {
    return (
        <div className="antialiased font-sans">
            <Navbar />
            <section>
                {children}
            </section>
            <Footer />
        </div>
    );
} 
