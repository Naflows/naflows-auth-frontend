import React, { JSX, useState } from "react";
import { availableDataPolicies, categories } from "../utils/policies";



interface PolicySetupComponentProps {
    servicePolicies: string[];
    setServicePolicies: (policies: string[]) => void;
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
                                <div key={policy.id} className={`data-policy-item ${servicePolicies.includes(policy.id) ? "selected" : ""
                                    }`} onClick={() => {
                                        if (servicePolicies.includes(policy.id)) {
                                            setServicePolicies(servicePolicies.filter(id => id !== policy.id));
                                        } else {
                                            setServicePolicies([...servicePolicies, policy.id]);
                                        }
                                    }}>
                                    <div className="data-policy-header">
                                        <div className="data-policy-icon">
                                            {policy.icon}
                                        </div>
                                        <h5>{policy.name}</h5>
                                    </div>
                                    <div className="data-policy-info">
                                        <p>{policy.description}</p>

                                        <div className="data-policy-includes">
                                            <p>Includes</p>
                                            <div className="includes-list">
                                                {policy.includes.map((include, index) => (
                                                    <span key={index}>{include.charAt(0).toUpperCase() + include.slice(1)}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="data-policy-does-not-includes">
                                            <p>Does Not Include</p>
                                            <div className="does-not-includes-list">
                                                {policy.doesNotIncludes?.length === 0 ? (
                                                    <span>None</span>
                                                ) : (
                                                    policy.doesNotIncludes?.map((dnInclude, index) => (
                                                        <span key={index}>{dnInclude.charAt(0).toUpperCase() + dnInclude.slice(1)}</span>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}