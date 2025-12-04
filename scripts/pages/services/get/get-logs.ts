import { Filters, Log } from "@/types/Logs.type";
import axios from "axios";


export async function getLogs(
    serviceId: string,
    offset: number,
    filters: Filters,
): Promise<{
    logs: Log[];
    total: number;
    tabs: number;
} | null> {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/logs`, {
        service_id: serviceId,
        limit: 20,
        offset: offset,
        filters: filters
    }, {
        withCredentials: true
    }).then((res) => {
        return {
            logs: res.data.logs,
            total: res.data.total,
            tabs: res.data.tabs
        }
    }).catch((err) => {
        console.error("Error fetching logs:", err);
        return null;
    });

    return res;

}