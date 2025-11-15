import ROOT_URL from "@/services/api-url";

export const communityPaging = async (context) => {
    const page = parseInt(context.query.page, 10) || 1;
    const searchString = context.query.searchString || "";

    try {
        const res = await fetch(`${ROOT_URL}/community/public/paginate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ page, perPage: 3, searchString }),
        });
        const json = await res.json();

        return {
            data: json?.data || [],
        };
    } catch (error) {
        console.error("Server side fetch error:", error);
        return {
            data: [],
        };
    }
};

export const fetchTopFeaturedBlogs = async () => {
    try {
        const res = await fetch(`${ROOT_URL}/blog/top-featured`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();

        return {
            data: json?.data || [],
        };
    } catch (error) {
        console.error("Server side fetch error:", error);
        return {
            data: [],
        };
    }
};
