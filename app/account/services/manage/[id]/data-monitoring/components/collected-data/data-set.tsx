import { availableDataPolicies } from "../../setup/utils/policies";



export default function ServiceDataMonitoringPolicy({
    policies,
}: {
    policies: string[];
}) {
    return (
        <div id="data-set-component">
            <h4>Collected Data Types</h4>
            <div className="data-policies-list-summary">
                {policies.map((policy) => {
                    const policyInfo = availableDataPolicies.find(p => p.id === policy);
                    if (!policyInfo) return null;
                    return (
                        <div key={policy} className="data-policy-item-summary">
                            {policyInfo.icon}
                            <div className="data-policy-item-content">
                                <h5>{policyInfo.name}</h5>
                                <p className="policy-category">
                                    {policyInfo.category.charAt(0).toUpperCase() + policyInfo.category.slice(1)} Data
                                </p>

                                <p className="policy-description">
                                    {policyInfo.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}