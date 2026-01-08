import { availableDataPolicies, DataPolicy } from "@/app/account/services/manage/[id]/data-monitoring/setup/utils/policies";
import Switch from "@/global/components/Switch";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import { useState } from "react";
import Markdown from "react-markdown";
import RegisterComponent from "./register";


export function SmallPolicyComponent({
    title, description, policyValue
}: {
    title: string;
    description: string;
    policyValue: string;
}) {

    const [displayValue, setDisplayValue] = useState(false);

    return (
        <>

            <div className="policy__value__override" style={{ display: displayValue ? "flex" : "none" }}>
                <div className="policy__value__override__content">
                    <div className="policy__value__header">
                        <h4>{title}</h4>
                        <p className="policy__description">{description}</p>
                    </div>
                    <div className="markdown">
                        <Markdown>{policyValue}</Markdown>
                    </div>


                    <div className="buttons-container">
                        <button className="secondary-button width-100-auto" onClick={() => {
                            setDisplayValue(false);
                        }}>
                            <span>Close</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="policy__component_small" onClick={() => {
                setDisplayValue(true);
            }}>
                <div className="policy__content">
                    <div className="policy__content__description">
                        <h4>{title}</h4>
                        <p className="policy__description">{description}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default function ServiceDataInformations({ service, consentGiven, setConsentGiven, openSection, setOpenSection, learnMoreOpen, setLearnMoreOpen }: { service: ServicesBodyProps, consentGiven: { [key: string]: boolean }, setConsentGiven: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>, openSection: string | null, setOpenSection: React.Dispatch<React.SetStateAction<string | null>>, learnMoreOpen: DataPolicy | null, setLearnMoreOpen: React.Dispatch<React.SetStateAction<DataPolicy | null>> }) {
    return (
        <div className="section">


            <RegisterComponent service={service} consentGiven={consentGiven} setConsentGiven={setConsentGiven} />

            <div className={`global__information__section ${openSection === "data-policy" ? "open" : ""}`}>
                <div className="information__content">
                    <div className="information__content__header">
                        <h2>
                            <span>
                                Data Sharing Information
                            </span>
                            <span className="open-section" onClick={() => {
                                if (openSection === "data-policy") {
                                    setOpenSection(null);
                                } else {
                                    setOpenSection("data-policy");
                                }
                            }}>
                                {openSection === "data-policy" ? "Close Details" : "Learn More"}
                            </span>
                        </h2>
                        <p>This service requires Naflows to provide the following data in order to function properly. Please make sure you review and consent to the use of this data.</p>
                    </div>
                    <div className="data__sharing__content">
                        {service.public_settings?.required_data?.map((dataItem) => {
                            const data = availableDataPolicies.find(d => d.id === dataItem);
                            return (
                                <div key={dataItem} className={`data__item`} onClick={() => {
                                    setLearnMoreOpen(data || null);
                                }}>
                                    <div className="data__item__info">
                                        <div className="data__item__content">
                                            {data?.icon}

                                            <h5>{data?.name || dataItem}</h5>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>




            <div className={`global__information__section ${openSection === "agreements" ? "open" : ""}`}>
                <div className="information__content">
                    <div className="information__content__header">
                        <h2>
                            <span>Agreements</span>
                            <span className="open-section" onClick={() => {
                                if (openSection === "agreements") {
                                    setOpenSection(null);
                                } else {
                                    setOpenSection("agreements");
                                }
                            }}>
                                {openSection === "agreements" ? "Close Details" : "Review Agreements"}
                            </span>
                        </h2>
                        <p>This service has specific policies regarding data usage and privacy. Please review and agree to these policies to continue using the service.</p>
                    </div>
                    <div className="data__sharing__content">
                        <SmallPolicyComponent
                            title="Service Policies Agreement"
                            description="I have read and agree to the service's data policies."
                            policyValue={service.details.public.privacy_policy_url?.value || "No policy provided."}
                        />
                        <SmallPolicyComponent
                            title="Terms of Service Agreement"
                            description="I have read and agree to the service's terms of service."
                            policyValue={service.details.public.terms_of_service_url?.value || "No policy provided."}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}