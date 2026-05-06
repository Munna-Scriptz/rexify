import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function PageTransition() {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true); // For fade out

    useEffect(() => {
        let timeout;

        // Disable scroll
        document.body.style.overflow = "hidden";
        setLoading(true);
        setVisible(true);

        const start = performance.now();

        timeout = setTimeout(() => {
            const end = performance.now();
            const loadTime = end - start;
            const minimumLoader = 600;

            setTimeout(() => {
                // Start fade out
                setVisible(false);

                // Remove loader after fade out duration
                setTimeout(() => {
                    setLoading(false);
                    document.body.style.overflow = "auto";
                }, 300); // fade out duration matches CSS
            }, Math.max(0, minimumLoader - loadTime));
        }, 50);

        return () => clearTimeout(timeout);
    }, [pathname]);

    if (!loading) return null;

    return (
        <section
            className={`loader-wrapper ${visible ? "fade-in" : "fade-out"}`}
        >
            <div className="loader"></div>
        </section>
    );
}

