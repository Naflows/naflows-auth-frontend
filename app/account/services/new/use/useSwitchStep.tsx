import ServiceCreationDisclaimer from "../sub-components/disclaimer";
import CreateServiceDescription from "../sub-components/service-details";
import ServiceConfiguration from "../sub-components/configuration";
import ServiceCreationFooterButtons from "../sub-components/footer";
import { ServiceConfigurationProps, ServiceCreationSteps, ServiceDescriptionProps } from "@/types/ServiceCreation";
import { createServiceToNass } from "@/scripts/pages/services/create-service";




export const getSwitchStep = ({
    serviceCreationStep,
    guidelinesAccepted,
    setServiceCreationStep,
    serviceDescription,
    serviceConfiguration,
    setGuidelinesAccepted,
    setServiceDescription,
    setServiceConfiguration
}: {
    serviceCreationStep: ServiceCreationSteps;
    guidelinesAccepted: boolean;
    setServiceCreationStep: React.Dispatch<React.SetStateAction<ServiceCreationSteps>>;
    serviceDescription: ServiceDescriptionProps
    serviceConfiguration: ServiceConfigurationProps ;
    setGuidelinesAccepted: React.Dispatch<React.SetStateAction<boolean>>;
    setServiceDescription: React.Dispatch<React.SetStateAction<ServiceDescriptionProps>>;
    setServiceConfiguration: React.Dispatch<React.SetStateAction<ServiceConfigurationProps>>;
}) => {

    switch (serviceCreationStep) {
        case "disclaimer":
            return (
                <div key={"disclaimer-header"} className="services__creation__body">
                    <ServiceCreationDisclaimer setGuidelinesAccepted={setGuidelinesAccepted} guidelinesAccepted={guidelinesAccepted} />
                    <button className={`primary-button width-100-auto ${guidelinesAccepted ? "active" : "inactive"}`} disabled={!guidelinesAccepted} onClick={() => {
                        if (guidelinesAccepted) {
                            setServiceCreationStep("wizard-init");
                        }
                    }}>Proceed</button>
                </div>
            )
        case "wizard-init":
            return (
                <div key={"wizard-init"} className="services__creation__body">
                    <CreateServiceDescription serviceDescription={serviceDescription} setServiceDescription={setServiceDescription} />
                    <ServiceCreationFooterButtons serviceCreationStep={serviceCreationStep} setServiceCreationStep={setServiceCreationStep} nextConditionMet={serviceDescription?.name != "" && serviceDescription?.description != "" && serviceDescription?.profileImage != "" && serviceDescription?.bannerImage != ""} />
                </div>
            )
        case "wizard-configure":
            return (
                <div key={"wizard-configure"} className="services__creation__body">
                    <ServiceConfiguration serviceConfiguration={serviceConfiguration} setServiceConfiguration={setServiceConfiguration} />
                    <ServiceCreationFooterButtons serviceCreationStep={serviceCreationStep} setServiceCreationStep={setServiceCreationStep} nextConditionMet={
                        serviceConfiguration.config.ip_address !== "" &&
                        serviceConfiguration.config.dns !== ""
                    } />
                </div>
            )
        case "wizard-review":
            createServiceToNass({
                serviceDescription,
                serviceConfiguration,
            });
            break;
        default:
            createServiceToNass({
                serviceDescription,
                serviceConfiguration,
            });;
    }
}