import axios from "axios";



/**
 * 
 * @param data -  {
 *   action : "TRANSFER_OWNERSHIP" | "CHANGE_SECURITY_SETTINGS" | "DELETE_ACCOUNT" | "CUSTOM_ACTION" | "DELETE_SERVICE" | "JOIN_SERVICE";
 * }
 * @returns 
 */

export default async function requestExists(data : {
    action : "TRANSFER_OWNERSHIP" | "CHANGE_SECURITY_SETTINGS" | "DELETE_ACCOUNT" | "CUSTOM_ACTION" | "DELETE_SERVICE" | "JOIN_SERVICE",
    data : {
        serviceID?: string
    }
}) : Promise<{
    success: boolean
}> {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/2FA/socket-status`, {
        ...data
    }, {
        withCredentials: true
    }).then((res) => {
        console.log("2FA request existence response:", res.data);
        return res.data as {
            success: boolean
        };
    }).catch((err) => {
        console.error("Error checking 2FA request existence:", err.response.data);
        return { success: false };
    });

    return res;
}