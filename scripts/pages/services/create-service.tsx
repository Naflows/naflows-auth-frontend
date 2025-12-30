import { ServiceConfigurationProps } from "@/types/ServiceCreation";
import axios from "axios";


export const createServiceToNass = ({
    serviceDescription,
    serviceConfiguration
}: {
    serviceDescription: {
        name: string;
        description: string;
        profileImage: string;
        allow_public_visibility: boolean;
        bannerImage?: string;
        id: string;
    },
    serviceConfiguration: ServiceConfigurationProps,
}) => {
    const create = axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/set-user-info/services/create`, {
        details: {
            public: serviceDescription,
            configuration: {
                plans: serviceConfiguration.plans.id,
                config: serviceConfiguration.config,
                settings: serviceConfiguration.settings
            }
        }
    }, {
        headers: {
            // Also allow large image uploads
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        withCredentials: true
    });
    create.then((res) => {
        console.log(res);
        if (res.status === 200) {
            setTimeout(() => {
                window.location.href = `/accout/services/manage/${serviceDescription.id}`;
            }, 5000);
        }
    }).catch((err) => {
    });
}