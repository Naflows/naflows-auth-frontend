import { ServiceTraffic } from "@/types/TrafficTypes";
import axios from "axios";


export async function fetchNetworkData(serviceId: string) : Promise<{
    traffic: ServiceTraffic;
    overwhelmed : boolean;
    maxRate: number;
}> {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/traffic`, {
        service_id: serviceId
    }, {
        withCredentials: true
    });
    return response.data;
}