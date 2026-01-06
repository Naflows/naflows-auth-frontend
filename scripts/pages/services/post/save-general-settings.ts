import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import axios from "axios";


export async function saveGeneralSettings(serviceId: string, settings: ServicesCompleteBodyProps["public_settings"]) : Promise<{ success: boolean; message: string; }> {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/public-details/update`, {
            service_id: serviceId,
            details : settings 
        }, {
            withCredentials: true,
        });
        
        if (response.status === 200 && response.data.success) {
            return { success: true, message: "Settings saved successfully." };
        } else {
            return { success: false, message: response.data.message || "Failed to save settings." };
        }


    } catch (error) {
        return { success: false, message: "An error occurred while saving settings." };
    }
}