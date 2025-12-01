"use client";

import {  useState } from "react";
import { getBasicServiceConfiguration, getBasicServiceDescription, ServiceConfigurationProps, ServiceCreationSteps, ServiceDescriptionProps } from "@/types/ServiceCreation";
import { getSwitchStep } from "./use/useSwitchStep";
import '@/public/root/pages/services/create/index.scss';

export default function CreateServicePage() {
    const [serviceCreationStep, setServiceCreationStep] = useState<ServiceCreationSteps>("disclaimer");
    const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);

    const [serviceDescription, setServiceDescription] = useState<ServiceDescriptionProps>(getBasicServiceDescription());
    const [serviceConfiguration, setServiceConfiguration] = useState<ServiceConfigurationProps>(getBasicServiceConfiguration());
    
    const component = getSwitchStep({
        serviceCreationStep,
        guidelinesAccepted,
        setServiceConfiguration,
        setServiceCreationStep,
        serviceDescription,
        serviceConfiguration,
        setGuidelinesAccepted,
        setServiceDescription
    }) || null;

    return (
        <div className="account__services__new__page user__body__section">
            <h1>Create a New Service</h1>
            {/* Render the current step component */}
            {component}
        </div>
    );
}