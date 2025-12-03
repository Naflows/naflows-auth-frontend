import axios from "axios";

async function getApiKey(api_id: string): Promise<string | null> {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/key/get`, {
        service_id: api_id
    }, {
        withCredentials: true
    });
    console.log("API Key response:", response);
    if (response.data && response.status === 200) {
        return response.data.key;
    }

    return null;
};



export async function getApiKeyFromBackend(serviceId: string, load?: {
    running: (loading: boolean) => void;
    content: (content: string) => void;
}) {
    load?.running(true);
    setTimeout(async () => {
        const key = await getApiKey(serviceId);
        if (key) {
            navigator.clipboard.writeText(key);
        }
        load?.running(false);
        load?.content("Copied to clipboard!");
        setTimeout(() => {
            load?.content("");
        }, 2000);
    }, 1000);
}