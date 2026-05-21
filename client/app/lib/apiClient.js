const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

async function request(endpoint, options = {}) {
    const {
        method = "GET",
        body,
        headers = {},
        next,
        cache,
        revalidate,
        tags = [],
    } = options;

    const requestHeaders = {
        "Content-Type": "application/json",
        ...headers,
    };

    if (typeof window === "undefined") {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const cookieString = cookieStore.toString();
            if (cookieString) {
                requestHeaders["Cookie"] = headers["Cookie"] || headers["cookie"] || cookieString;
            }
        } catch (error) {
           
        }
    }

    const fetchOptions = {
        method,
        headers: requestHeaders,
        credentials: "include",
        ...(body && { body: JSON.stringify(body) }),

        // Next.js specific options (only work on server)
        ...(next || revalidate || tags
            ? {
                next: {
                    revalidate: revalidate ?? next?.revalidate ?? 0,
                    tags: tags ?? next?.tags ?? [],
                },
            }
            : {}),

        ...(cache && { cache }),
    };

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
}


// Convenience methods
export const apiClient = {
    get: (url, options = {}) =>
        request(url, { ...options, method: "GET" }),

    post: (url, body, options = {}) =>
        request(url, { ...options, method: "POST", body }),

    put: (url, body, options = {}) =>
        request(url, { ...options, method: "PUT", body }),

    patch: (url, body, options = {}) =>
        request(url, { ...options, method: "PATCH", body }),

    delete: (url, options = {}) =>
        request(url, { ...options, method: "DELETE" }),
};