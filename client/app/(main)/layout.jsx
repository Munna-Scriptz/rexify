import "../globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { apiClient } from "../lib/apiClient";

export default async function Layout({ children }) {
    const cartCount = await apiClient.get("/cart/count", {
        tags: ["cart"],
    });
    return (
        <>
            <Navbar cart={cartCount?.data?.totalItems}/>
            {children}
            <Footer />
        </>
    );
} 
