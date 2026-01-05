import axios from "axios";



export async function setPolicies(serviceId: string, policies: string[]) : Promise<{ success: boolean; message?: string }> {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/policies/set`, {
            service_id: serviceId,
            policies: policies
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log("Set Policies Response:", response);
        
        if (!response.data.success) {
            return { success: false, message: response.data.message };
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}