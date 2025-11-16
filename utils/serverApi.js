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

export const fetchCommunityDetails = async (context, token) => {
    const communityId = context.query.id;
    let url = `${ROOT_URL}/community/public/get/${communityId}`;
    if(token) {
        url = `${ROOT_URL}/community/get/${communityId}`;
    }

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", "X-Access-Token": token || "" },
        });
        const json = await res.json();

        return {
            data: json?.data || {},
        };
    } catch (error) {
        console.error("Server side fetch error:", error);
        return {
            data: {},
        };
    }
};

export const paginateCommunity = async ({ page = 1, perPage = 10, searchString = "", type = "" }, token = null) => {
    try {
        let url = `${ROOT_URL}/community/public/paginate`;
        let body = { page, perPage, searchString };
        if (token) {
            url = `${ROOT_URL}/community/paginate`;
            body.type = type;
        }
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Access-Token": token || "" },
            body: JSON.stringify(body),
        });
        const json = await res.json();

        return {
            list: json?.data || [],
            totalCount: json?.totalCount || 0,
            activePage: page,   
        };
    } catch (error) {
        console.error("Server side fetch error:", error);
        return {
            list: [],
            totalCount: 0,
            activePage: page,
        };
    }
};
