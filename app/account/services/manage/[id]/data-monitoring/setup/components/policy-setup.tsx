import React, { JSX, useState } from "react";
import { availableDataPolicies, categories } from "../utils/policies";
import DataPolicyItem from "../../components/global/data-policy-item";



interface PolicySetupComponentProps {
    servicePolicies: string[];
    setServicePolicies: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PolicySetupComponent({
    servicePolicies,
    setServicePolicies
}: PolicySetupComponentProps) {

    const categoriesOrder: categories[] = ['personal', 'technical', 'usage'];

    availableDataPolicies.sort((a, b) => {
        return categoriesOrder.indexOf(a.category) - categoriesOrder.indexOf(b.category);
    });



    return (
        <div id="policy-setup-component">
            <p>
                Select the data your service requires from Naflows for proper operation. Users will be notified of your data collection policies and can review them at any time. Users may opt out of certain data collections based on your configured policies, and will be informed of any resulting impact on their service experience.
            </p>

            <div className="available-data-policies">
                {categoriesOrder.map((category) => (
                    <div key={category} className="data-policy-category">
                        <div className="data-policy-category-header">
                            <h4>{category.charAt(0).toUpperCase() + category.slice(1)} Data</h4>
                            <button className="secondary-button" onClick={() => {
                                const policiesInCategory = availableDataPolicies.filter(policy => policy.category === category).map(policy => policy.id);
                                const allSelected = policiesInCategory.every(policyId => servicePolicies.includes(policyId));
                                if (allSelected) {
                                    // Deselect all
                                    setServicePolicies(servicePolicies.filter(id => !policiesInCategory.includes(id)));
                                } else {
                                    // Select all
                                    const newPolicies = [...servicePolicies];
                                    policiesInCategory.forEach(policyId => {
                                        if (!newPolicies.includes(policyId)) {
                                            newPolicies.push(policyId);
                                        }
                                    });
                                    setServicePolicies(newPolicies);
                                }
                            }}>
                                {availableDataPolicies.filter(policy => policy.category === category).every(policy => servicePolicies.includes(policy.id)) ? "Deselect All" : "Select All"}
                            </button>
                        </div>
                        <div className="data-policies-list">
                            {availableDataPolicies.filter(policy => policy.category === category).map(policy => (
                                <DataPolicyItem 
                                    key={policy.id}
                                    policy={policy}
                                    servicePolicies={servicePolicies}
                                    setServicePolicies={setServicePolicies}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}