import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import axios from "axios";

const fetchServiceData = async (id: string, signal: AbortSignal) : Promise<ServicesCompleteBodyProps | null> => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/get-user-info/services/${id}/service-informations`,
            {
                withCredentials: true,
                signal: signal,
                headers: {
                    "Content-Type": "application/json",
                    
                },
            }
        );
        console.log(res.data);
        if (res.status === 200 ) {
            console.log(res.data.service, "service data");
            return res.data.service;
        }
    } catch (error) {
        console.error("Error fetching service data:", error);
        throw error;
    }

    return null;
};

export default fetchServiceData;