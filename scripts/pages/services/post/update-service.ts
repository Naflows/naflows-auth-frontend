import { ServiceDescriptionProps } from "@/types/ServiceCreation";
import axios from "axios";



export async function updateServiceDescriptionToNass({
    serviceDescription,
}: {
    serviceDescription: ServiceDescriptionProps;
}): Promise<{
    status: number;
    message: string;
}> {

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/service/update`, {
            serviceDetails: {
                name: serviceDescription.name,
                description: serviceDescription.description,
                profileImage: serviceDescription.profileImage,
                allow_public_visibility: serviceDescription.allow_public_visibility,
                bannerImage: serviceDescription.bannerImage,
                id: serviceDescription.id
            }
        }, {
            withCredentials: true
        });
        if (response.status === 200) {
            return {
                status: 200,
                message: "Service description updated successfully."
            }
        } else {
            return {
                status: response.status,
                message: response.data?.message || "Failed to update service description."
            }
        }
    } catch (error) {
        console.error("Error saving changes:", error);
        return {
            status: 500,
            message: "An error occurred while saving changes. Please try again.",
        }
    }
}