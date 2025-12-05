import { ServiceUser } from "@/types/ServicesForUserProps";
import axios from "axios";

export default async function fetchUserList(serviceId: string): Promise<ServiceUser[]> {
    if (serviceId) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/users`, {
            service_id: serviceId
        }, {
            withCredentials: true
        }).then((res) => {
            return res;
        }).catch((error) => {
            console.error("Error fetching service users:", error);
            return { data: { success: false } };
        });
        if (response.data.success) {
            return response.data.serviceUsers || [];
        }

        return [];
    } else {
        return [];
    }
};