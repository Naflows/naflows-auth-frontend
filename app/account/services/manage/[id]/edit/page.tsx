"use client";

import { ServiceDescriptionProps } from "@/types/ServiceCreation";
// Used for general details edition

import CreateServiceDescription from "../../../new/sub-components/service-details";

import { useServiceData } from "../layout";
import { useEffect, useState } from "react";
import '@/public/root/pages/services/create/index.scss';
import SaveChanges from "@/global/components/save";
import { updateServiceDescriptionToNass } from "@/scripts/pages/services/post/update-service";
import { useNotification } from "@/global/action-information/NotificationContent";


export default function EditServicePage() {
    const serviceData = useServiceData();
    const service = serviceData?.service;
    const { addNotification } = useNotification();

    const [serviceDescription, setServiceDescription] = useState<ServiceDescriptionProps | null>(null);
    const [isDitrty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!service) return;

        console.log("Setting service description for edit:", service);

        setServiceDescription({
            name: service?.name || "",
            description: service?.description || "",
            profileImage: service?.picture || "",
            allow_public_visibility: service?.public?.allow_public_visibility || false,
            bannerImage: service?.banner || "",
            id: service?.id || "",
        });
        setIsDirty(false);
    }, [service]);

    useEffect(() => {
        if (!service) return;

        if (JSON.stringify({
            name: service?.name || "",
            description: service?.description || "",
            profileImage: service?.picture || "",
            allow_public_visibility: service?.public?.allow_public_visibility || false,
            bannerImage: service?.banner || "",
        }) !== JSON.stringify({
            name: serviceDescription.name,
            description: serviceDescription.description,
            profileImage: serviceDescription.profileImage,
            allow_public_visibility: serviceDescription.allow_public_visibility,
            bannerImage: serviceDescription.bannerImage,
        })) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    }, [serviceDescription]);

    if (!service || !serviceDescription) return null;


    return (
        <div className="user__body__section">
            <CreateServiceDescription
                serviceDescription={serviceDescription}
                setServiceDescription={setServiceDescription}
                editMode={true}
            />
            <SaveChanges
                appear={isDitrty}
                onChange={async () => {
                    console.log("Saving changes for service description:", serviceDescription);
                    const t = await updateServiceDescriptionToNass({
                        serviceDescription,
                    });

                    if (t.status === 200) {
                        setIsDirty(false);
                        addNotification({
                            type: "info",
                            title: "Service description updated",
                            description: "The service description has been updated successfully.",
                        });
                    } else {
                        addNotification({
                            type: "error",
                            title: "Failed to update service description",
                            description: "Something went wrong while updating the service description: " + t.message,
                        });
                    }
                    console.log("Update service description response:", t);
                }}
            />
        </div>
    )
}