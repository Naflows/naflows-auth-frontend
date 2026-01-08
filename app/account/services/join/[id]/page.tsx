"use client";

import { dateToTimespan } from "@/scripts/utils/dateToTimespan";
import JoinServiceDisclaimer from "./components/disclaimer";
import { useJoinServiceData } from "./layout";
import '@/public/root/pages/services/join/index.scss';
import Markdown from "react-markdown";
import { availableDataPolicies, DataPolicy } from "../../manage/[id]/data-monitoring/setup/utils/policies";
import { useEffect, useState } from "react";
import DataPolicyDetails from "./components/disclaimer/data-policy-details";
import '@/public/root/pages/services/manage/data-monitoring/index.scss';
import Switch from "@/global/components/Switch";
import { ServiceRegistrationNotAllowedDisclaimer } from "./components/disclaimer/registration-not-allowed";
import ServiceDetails from "./components/service/details";
import ServiceDataInformations from "./components/service/data-informations";
import requestExists from "@/scripts/modules/2FA/request-exists";







export default function JoinServicePage() {

    const { service } = useJoinServiceData() || {};

    const [learnMoreOpen, setLearnMoreOpen] = useState<DataPolicy | null>(null);
    console.log("Rendering JoinServicePage with service:", service);

    const [openSection, setOpenSection] = useState<string | null>(null);

    const [consentGiven, setConsentGiven] = useState<{
        [key: string]: boolean;
    }>({});


    const [checkCrypto, setCheckCrypto] = useState<boolean>(false);

    useEffect(() => {
        if (service != null && service != undefined) {
            async function checkCryptoSupport() {
                await requestExists({
                    action: "JOIN_SERVICE",
                    data: {
                        serviceID: service?.id
                    }
                });
            }
            checkCryptoSupport().then((res) => {
                console.log("Crypto support check completed." + JSON.stringify(res));
                setCheckCrypto(true);
            }).catch((error) => {
                console.error("Error checking crypto support:", error);
                setCheckCrypto(false);
            });
        }
    }, [service]);

    if (!service) {
        return (
            <div className="account__services__join__page">
                <span className="small-loader"></span>
            </div>
        );
    }



    return (
        <div className="account__service__join" id={service.id}>

            <DataPolicyDetails setPolicy={setLearnMoreOpen} policy={learnMoreOpen} />

            <div className="join__box__presentation">
                <img src={service.banner} alt={`${service.name} banner`} className="service__banner__image" />
                <div className="service__picture__container">
                    <img src={service.picture} alt={`${service.name} logo`} className="service__picture__image" />
                </div>


                <div className="body">
                    <ServiceDetails service={service} />


                    <ServiceDataInformations
                        service={service}
                        consentGiven={consentGiven}
                        setConsentGiven={setConsentGiven}
                        openSection={openSection}
                        setOpenSection={setOpenSection}
                        learnMoreOpen={learnMoreOpen}
                        setLearnMoreOpen={setLearnMoreOpen}
                    />
                </div>
            </div>
        </div>
    );
}

