import "../globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { apiClient } from "../lib/apiClient";
import { cookies } from "next/headers";

export default async function Layout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('X-AS-TOKEN')?.value;

    // ------------- Fetch API ------------
    const [user, cartCount, categories] = await Promise.all([
        token ? apiClient.get('/auth/profile') : null,
        apiClient.get("/cart/count", {
            tags: ["cart"],
        }),
        apiClient.get("/category/all")
    ]);
    
    return (
        <>
            <Navbar user={user} cart={cartCount?.data?.totalItems} categories={categories?.data} />
            {children}
            <Footer />
        </>
    );
} 
