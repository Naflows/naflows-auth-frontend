"use client";

import { JSX, useEffect, useState } from "react";
import switchDataMonitoringSetupSteps from "./utils/switchStep";
import '@/public/root/pages/services/manage/data-monitoring/setup.scss';
import { setPolicies } from "@/scripts/pages/services/post/set-policies";
import { useServiceData } from "../../layout";
import Loader from "@/global/components/Loader";
import Alert from "@/global/error-alert/Alert";

export default function DataMonitoringSetupPage() {

    const serviceData = useServiceData();
    const service = serviceData?.service;

    const steps = ["introduction", "policy-setup", "review"] as const;

    const [step, setStep] = useState<"introduction" | "policy-setup" | "review">("introduction");

    const [servicePolicies, setServicePolicies] = useState<string[]>([]);

    const [stepValue, setStepValue] = useState<{
        title: string;
        description: string;
        number: number;
        component?: JSX.Element;
    }>(switchDataMonitoringSetupSteps(step, { servicePolicies, setServicePolicies }));

    useEffect(() => {
        if (service && service.public_settings && service.public_settings.required_data) {
            setServicePolicies(service.public_settings.required_data);
        }
    }, [service])

    useEffect(() => {
        console.log("Current Step:", step);
        setStepValue(switchDataMonitoringSetupSteps(step, { servicePolicies, setServicePolicies }));
    }, [step, servicePolicies]);

    if (!service) {
        return <Loader loading={true} title="Loading Policies Setup" message="Please wait while we fetch the service information." />;
    }

    return (
        <div className="user__body__section " id="data-monitoring-setup-page">




            {steps.map((s) => {
                const nextStepIndex = steps.indexOf(s) + 1;
                const isNextStepAvailable = nextStepIndex < steps.length;
                return (<div
                    key={s}
                    className={`data-monitoring-setup-step ${step === s ? "active" : ""} ${steps.indexOf(s) < steps.indexOf(step) ? "completed" : ""}`}
                >
                    <div className="step__header" onClick={() => {
                        const currentStepIndex = steps.indexOf(step);
                        const clickedStepIndex = steps.indexOf(s);
                        if (clickedStepIndex <= currentStepIndex) {
                            setStep(s);
                            setStepValue(switchDataMonitoringSetupSteps(s, { servicePolicies, setServicePolicies }));
                        }
                    }}>
                        <div className="step__number">
                            {switchDataMonitoringSetupSteps(s).number}
                        </div>
                        <div className="step__info">
                            <h3>{switchDataMonitoringSetupSteps(s).title}</h3>
                            <p>{switchDataMonitoringSetupSteps(s).description}</p>
                        </div>
                    </div>
                    <div className="step__content">
                        {stepValue.component}


                        <div className="buttons-container">

                            {
                                step != "introduction" && (
                                    <button className="secondary-button" onClick={() => {
                                        const prevStepIndex = steps.indexOf(s) - 1;
                                        if (prevStepIndex >= 0) {
                                            setStep(steps[prevStepIndex]);
                                            setStepValue(switchDataMonitoringSetupSteps(steps[prevStepIndex]));
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M7.28 16.28a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 1 1 1.06 1.06L5.81 11H21a.75.75 0 0 1 0 1.5H5.81l1.47 1.47a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                                        </svg>
                                        <span>Previous Step</span>
                                    </button>
                                )
                            }


                            <button className="primary-button" onClick={async () => {
                                if (isNextStepAvailable) {
                                    setStep(steps[nextStepIndex]);
                                    setStepValue(switchDataMonitoringSetupSteps(steps[nextStepIndex], { servicePolicies, setServicePolicies }));
                                } else {
                                    // Finish Setup
                                    const result = await setPolicies(service.id, servicePolicies);
                                    if (result.success) {
                                        // Redirect to data monitoring page
                                        window.location.href = `/account/services/manage/${service.id}/data-monitoring`;
                                    }
                                }
                            }}>
                                <span>{isNextStepAvailable ? "Next Step" : "Finish Setup"}</span>
                                {isNextStepAvailable ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>) : null
                                }
                            </button>
                        </div>
                    </div>
                </div>)
            })}
        </div>
    );
}