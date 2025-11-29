import axios from "axios";


export async function getAllServices( signal?: AbortSignal) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/get-user-info/services`,
        {
            withCredentials: true,
            signal: signal,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return res;
}