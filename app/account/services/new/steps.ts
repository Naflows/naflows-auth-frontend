import { ServiceCreationSteps } from "@/types/ServiceCreation";


const steps:
    Record<ServiceCreationSteps, { title: string; description: string }>
= {
    "disclaimer": {
        title: "Service Creation Guidelines",
        description: "Please read and accept the service creation guidelines before proceeding."
    },
    "wizard-init": {
        title: "Service Details",
        description: "Provide the basic details for your new service."
    },
    "wizard-configure": {
        title: "Service Configuration",
        description: "Configure the technical settings of your service."
    },
    "wizard-review": {
        title: "Review & Create",
        description: "Review your service details and create your service."
    }
};


export default function getStepContent(stepKey: ServiceCreationSteps) : { title: string; description: string } {
    return steps[stepKey] || { title: "Unknown Step", description: "No description available." };
}