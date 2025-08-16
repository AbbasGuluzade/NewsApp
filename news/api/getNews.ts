export interface Article {
    id: string;
    webTitle: string;
    webUrl: string;
    webPublicationDate: string;
    fields?: {
        thumbnail?: string;
        trailText?: string;
        body?: string;
    };
}

const API_KEY = "8deed9c7-ddbf-44d3-bfb5-11f5bd16fab1";
const BASE_URL = "https://content.guardianapis.com/search";

export async function fetchNews(page: number, query: string = "world") {
    try {
        const url = `${BASE_URL}?api-key=${API_KEY}&page=${page}&page-size=10&q=${query}&order-by=newest&show-fields=thumbnail,trailText`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.response || !data.response.results) {
            console.log(response.status, response.statusText);
            throw new Error("Invalid Guardian API response");
        }

        return {
            articles: data.response.results as Article[],
            totalResults: data.response.total as number,
        };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { articles: [], totalResults: 0 };
    }
}
