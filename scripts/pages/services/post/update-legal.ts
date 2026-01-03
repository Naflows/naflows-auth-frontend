import { LegalType } from "@/app/account/services/manage/[id]/settings/legal/upload/[type]/layout";
import axios from "axios";


export async function updateLegalDocument(
    serviceId: string,
    type: LegalType,
    content: string
): Promise<{ success: boolean; message: string }> {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/legal/update`, {
            type: type,
            markdown: content,
            service_id: serviceId
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log(response)

        if (!response.data.success) {
            const errorData = response.data;
            return { success: false, message: errorData.message || "Failed to update legal document." };
        }

        return { success: true, message: "Legal document updated successfully." };
    } catch (error) {
        console.error("Error updating legal document:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}