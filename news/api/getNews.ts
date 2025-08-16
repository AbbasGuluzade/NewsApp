const API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = "5b018754e90b499fa2b71519db3bf16e"; // ideally from .env

export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    articles: Article[];
    totalResults: number;
}

/**
 * Fetch news articles with pagination.
 * @param page - Page number to fetch.
 * @param pageSize - Number of articles per page.
 */
export const fetchNews = async (
    page: number = 1,
    pageSize: number = 10
): Promise<NewsResponse> => {
    try {
        const url = `${API_URL}?country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = (await response.json()) as NewsResponse;
        return {
            articles: data.articles || [],
            totalResults: data.totalResults || 0,
        };
    } catch (error) {
        console.error("Failed to fetch news:", error);
        throw error;
    }
};
