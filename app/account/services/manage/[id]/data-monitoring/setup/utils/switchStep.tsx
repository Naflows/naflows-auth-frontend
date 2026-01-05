
import React, { JSX } from "react";
import MonitoringSetupIntroductionComponent from "../components/introduction";
import PolicySetupComponent from "../components/policy-setup";
import DataMonitoringPolicyReview from "../components/complete-policy";

export default function switchDataMonitoringSetupSteps(step: "introduction" | "policy-setup" | "review", options?: { servicePolicies: string[]; setServicePolicies: (policies: string[]) => void; }): {
    title: string;
    description: string;
    number: number;
    component?: JSX.Element;
} {
    switch (step) {
        case "introduction":
            return {
                title: "Introduction",
                description: "Welcome to the Data Monitoring Setup. This guide will help you configure data monitoring for your service.",
                number: 1,
                component: <MonitoringSetupIntroductionComponent />
            };
        case "policy-setup":
            return {
                title: "Policy Setup",
                description: "Set up your data monitoring policies to specify what data should be collected and monitored.",
                number: 2,
                component:  <PolicySetupComponent servicePolicies={options?.servicePolicies || []} setServicePolicies={options?.setServicePolicies || (() => {})} />
            };
        case "review":
            return {
                title: "Review",
                description: "Review your data monitoring setup before finalizing the configuration.",
                number: 3,
                component: <DataMonitoringPolicyReview servicePolicies={options?.servicePolicies || []} />
            };
    }
}