export interface ServiceDescriptionProps {
    name: string;
    description: string;
    profileImage: string;
    allow_public_visibility: boolean;
    bannerImage?: string;
    id: string;
}


export function getBasicServiceDescription(): ServiceDescriptionProps {
    return {
        name: "",
        description: "",
        profileImage: "",
        allow_public_visibility: false,
        bannerImage: "",
        id: "",
    };
}


export interface ServiceConfigurationProps {
    plans: {
        id: number;
        name: string;
        description: string;
        price: number;
        features: { feature: string; icon: string }[]; // Updated to include icon
        type: "cloud" | "local";
        storage: number;
        RPS: number;
    },
    settings: {
        allow_public_registration: boolean;
    },
    config: {
        ip_address: string;
        dns: string;
    }
}


export function getBasicServiceConfiguration(): ServiceConfigurationProps {
    return {
        plans: {
            id: 0,
            name: "",
            description: "",
            price: 0,
            features: [],
            type: "cloud",
            storage: 0,
            RPS: 0
        },
        settings: {
            allow_public_registration: false,
        },
        config: {
            ip_address: "",
            dns: "",
        }
    };
}


export type ServiceCreationSteps = "disclaimer" | "wizard-init" | "wizard-configure" | "wizard-review";
