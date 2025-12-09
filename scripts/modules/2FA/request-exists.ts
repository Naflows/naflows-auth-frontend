import axios from "axios";


export default async function requestExists(data : object) : Promise<{
    success: boolean
}> {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/2FA/socket-status`, {
        ...data
    }, {
        withCredentials: true
    }).then((res) => {
        return res.data as {
            success: boolean
        };
    }).catch((err) => {
        console.error("Error checking 2FA request existence:", err.response.data);
        return { success: false };
    });

    return res;
}