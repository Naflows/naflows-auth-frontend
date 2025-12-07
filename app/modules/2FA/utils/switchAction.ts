import { getPublicServiceInformations } from "@/scripts/pages/services/get/get-public-infos";
import { getBasicServiceDescription } from "@/types/ServiceCreation";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";



export default async function switchTwoFAAction(action: string, serviceID?: string) : Promise<{
    title: string;
    description: string;
    service?: ServicesBodyProps;
} | null> {
    switch (action) {
        case "TRANSFER_OWNERSHIP":
            const service = await getPublicServiceInformations(serviceID!, null);

            return {
                title: "Service Ownership Transfer",
                description: "You are about to transfer ownership of this service. This action is irreversible and will grant the new owner full control over the service.",
                service : service
            };
        case "delete-service":
            return {
                title: "Delete Service",
                description: "You are about to delete this service permanently. This action cannot be undone and all associated data will be lost.",
            };
        case "update-billing":
            return {
                title: "Update Billing Information",
                description: "You are about to update the billing information for this service. Please ensure that the new billing details are accurate to avoid any service interruptions.",
            };
        default:
            return null;
    }
}