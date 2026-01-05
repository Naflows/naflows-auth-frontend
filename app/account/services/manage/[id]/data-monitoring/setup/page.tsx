"use client";

import { JSX, useEffect, useState } from "react";
import switchDataMonitoringSetupSteps from "./utils/switchStep";
import '@/public/root/pages/services/manage/data-monitoring/setup.scss';

export default function DataMonitoringSetupPage() {

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
        console.log("Current Step:", step);
        setStepValue(switchDataMonitoringSetupSteps(step, { servicePolicies, setServicePolicies }));
    }, [step, servicePolicies]);

    return (
        <div className="user__body__section " id="data-monitoring-setup-page">
            {steps.map((s) => {
                const nextStepIndex = steps.indexOf(s) + 1;
                const isNextStepAvailable = nextStepIndex < steps.length;
                return (<div
                    key={s}
                    className={`data-monitoring-setup-step ${step === s ? "active" : ""}`}
                >
                    <div className="step__header" onClick={() => setStep(s)}>
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


                            <button className="primary-button" onClick={() => {
                                console.log("Next Step Clicked");
                                console.log("isNextStepAvailable:", isNextStepAvailable);
                                if (isNextStepAvailable) {
                                    console.log("Moving to next step:", steps[nextStepIndex]);
                                    setStep(steps[nextStepIndex]);
                                    setStepValue(switchDataMonitoringSetupSteps(steps[nextStepIndex]));
                                } else {
                                    alert("Data Monitoring Setup Completed!");
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