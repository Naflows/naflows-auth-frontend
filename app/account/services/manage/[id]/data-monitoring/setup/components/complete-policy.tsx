import { availableDataPolicies } from "../utils/policies";


export default function DataMonitoringPolicyReview({
    servicePolicies
}: {
    servicePolicies: string[];
}) {
    return (
        <div id="data-monitoring-policy-review-component">
            <div className="selected-policy-content">
                {servicePolicies.length === 0 ? (
                    <p>
                        No data policies selected.
                        Naflows will not send any data to your service until at least one data policy is selected.
                    </p>
                ) : (
                    <>
                        <p>
                            The following data policies are required by your service to function correctly:
                        </p>
                        {servicePolicies.map((policyId) => (
                            <div className="data-policy-item no-hover" key={policyId}>
                                <div className="data-policy-header">
                                    <div className="data-policy-icon">
                                        {
                                            availableDataPolicies.find(policy => policy.id === policyId)?.icon || policyId
                                        }
                                    </div>
                                    <span>
                                        {
                                            availableDataPolicies.find(policy => policy.id === policyId)?.name || policyId
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                        <p>
                            Please remember that your users may be able to opt out of certain data collections based on these policies, which could impact their service experience.
                            <br />
                            You may be held accountable for ensuring compliance with data protection regulations depending on your jurisdiction and the nature of the data being collected. Learn more in our <a href="https://docs.nass.dev/services/data-monitoring" target="_blank" rel="noreferrer">documentation</a> and <a href="https://naflows.com/privacy-policy" target="_blank" rel="noreferrer">privacy policy</a>.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}