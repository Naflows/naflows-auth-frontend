import axios from "axios";


export default async function canUserAccessService(serviceId: string, signal: AbortSignal) : Promise<boolean > {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/services/can-access`, {
        service_id: serviceId
    }, {
        withCredentials: true,
        signal: signal
    }).then((res) => {
        console.log("Access check response:", res);
        if (!(res.status === 200)) {
            console.log("Access check failed:", res);
            return false;
        } else {
            console.log("Access check succeeded:", res);
            return true;
        }
    }).catch((err) => {
        console.log("Error during access check:", err);
        return false;
    });
    
    return res;
}