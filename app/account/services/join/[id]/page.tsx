"use client";

import { dateToTimespan } from "@/scripts/utils/dateToTimespan";
import JoinServiceDisclaimer from "./components/disclaimer";
import { useJoinServiceData } from "./layout";
import '@/public/root/pages/services/join/index.scss';
import Markdown from "react-markdown";
import { availableDataPolicies, DataPolicy } from "../../manage/[id]/data-monitoring/setup/utils/policies";
import { useState } from "react";
import DataPolicyDetails from "./components/disclaimer/data-policy-details";
import '@/public/root/pages/services/manage/data-monitoring/index.scss';
import Switch from "@/global/components/Switch";


export function SmallPolicyComponent({
    value, title, description, accepted, policyValue, onChange
}: {
    value: string;
    title: string;
    description: string;
    accepted?: boolean;
    policyValue: string;
    onChange?: () => void;
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
                        <Switch
                            label="I agree to the above policy"
                            checked={accepted || false}
                            onChange={(c) => {
                                if (c != accepted && onChange) {
                                    onChange();
                                }
                            }}
                            description="By agreeing, you consent to the terms outlined in the policy above."
                        />
                        <button className="secondary-button width-100-auto" onClick={() => {
                            setDisplayValue(false);
                        }}>
                            <span>Close</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="policy__component_small">
                <div className="policy__content">
                    <div className="policy__content__description">
                        <h4>{title}</h4>
                        <p className="policy__description">{description}</p>
                    </div>
                    <p className={`policy__value ${accepted ? "accepted" : "not-accepted"}`}>{value}</p>

                </div>

                <button className="secondary-button" onClick={() => {
                    setDisplayValue(true);
                }}>
                    <span>Review</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </>
    )
}


export default function JoinServicePage() {

    const { service } = useJoinServiceData() || {};

    const [learnMoreOpen, setLearnMoreOpen] = useState<DataPolicy | null>(null);
    console.log("Rendering JoinServicePage with service:", service);


    const [consentGiven, setConsentGiven] = useState<{
        [key: string]: boolean;
    }>({});

    if (!service) {
        return (
            <div className="account__services__join__page">
                Loading service data...
            </div>
        );
    }

    return (
        <div className="account__service__join" id={service.id}>
            <JoinServiceDisclaimer nassOwned={service.details.official} />


            <DataPolicyDetails setPolicy={setLearnMoreOpen} policy={learnMoreOpen} />

            <div className="join__box__presentation">
                <img src={service.banner} alt={`${service.name} banner`} className="service__banner__image" />
                <div className="service__picture__container">
                    <img src={service.picture} alt={`${service.name} logo`} className="service__picture__image" />
                </div>


                <div className="service__informations__header">
                    <h1 className="service__name__header">
                        <span className="service__name">{service.name}</span>
                        <span>
                            Created {dateToTimespan(service.created_at)}
                        </span>
                    </h1>
                    <div className="service__description__details__container">
                        <div className="service__description__details">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" /></svg>
                                <a
                                    href={`https://${service.dns}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tertiary-button"
                                >
                                    {service.dns}
                                </a>
                            </span>
                            <span style={{ display: service.details.official ? "inline-flex" : "none" }} className="official-badge" title="This service is owned and operated by Naflows, which means it has been developed in-house and is maintained directly by the Naflows team.">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m438-452-56-56q-12-12-28-12t-28 12q-12 12-12 28.5t12 28.5l84 85q12 12 28 12t28-12l170-170q12-12 12-28.5T636-593q-12-12-28.5-12T579-593L438-452Zm42 368q-7 0-13-1t-12-3q-135-45-215-166.5T160-516v-189q0-25 14.5-45t37.5-29l240-90q14-5 28-5t28 5l240 90q23 9 37.5 29t14.5 45v189q0 140-80 261.5T505-88q-6 2-12 3t-13 1Z" /></svg>
                                Naflows-Owned Service
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm698 112q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160H738ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z" /></svg>
                                {service.details.users} user{service.details.users > 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>
                    <div className="service__description__content">
                        <Markdown>{service.description || "No description provided."}</Markdown>
                    </div>
                </div>

                <div className={`global__information__section ${consentGiven["required_data"] ? "highlighted" : "consent-not-given"}`}>
                    <div className="information__content">
                        <div className="information__content__header">
                            <h2>Data Sharing Information</h2>
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

                    <Switch
                        label="I consent to the use of the required data for this service"
                        checked={!!consentGiven["required_data"]}
                        onChange={(checked) => {
                            if (checked != consentGiven["required_data"]) {
                                setConsentGiven(prev => ({
                                    ...prev,
                                    "required_data": checked
                                }));
                            }
                        }}
                        description="I allow this service to collect and use the required data as outlined above in order to provide its functionality. I may withdraw my consent for some or all of this data at any time through my account settings."
                    />
                </div>


                <div className={`global__information__section ${(consentGiven["terms_of_service_required"] && consentGiven["policies_required"]) ? "highlighted" : "consent-not-given"}`}>
                    <div className="information__content">
                        <div className="information__content__header">
                            <h2>Service Policies Agreement</h2>
                            <p>This service has specific policies regarding data usage and privacy. Please review and agree to these policies to continue using the service.</p>
                        </div>
                        <div className="data__sharing__content">
                            <SmallPolicyComponent
                                title="Service Policies Agreement"
                                description="I have read and agree to the service's data policies."
                                value={consentGiven["policies_required"] ? "Agreed" : "Not Agreed"}
                                accepted={consentGiven["policies_required"]}
                                policyValue={service.details.public.privacy_policy_url?.value || "No policy provided."}
                                onChange={() => {
                                    setConsentGiven(prev => ({
                                        ...prev,
                                        "policies_required": !prev["policies_required"]
                                    }));
                                }}
                            />
                            <SmallPolicyComponent
                                title="Terms of Service Agreement"
                                description="I have read and agree to the service's terms of service."
                                value={consentGiven["terms_of_service_required"] ? "Agreed" : "Not Agreed"}
                                accepted={consentGiven["terms_of_service_required"]}
                                policyValue={service.details.public.terms_of_service_url?.value || "No policy provided."}
                                onChange={() => {
                                    setConsentGiven(prev => ({
                                        ...prev,
                                        "terms_of_service_required": !prev["terms_of_service_required"]
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

