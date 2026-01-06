import { DataPolicy } from "../../setup/utils/policies";


function MainComponent({
    policy,
}: {
    policy: DataPolicy;
}) {
    return (
        <>
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
        </>
    )
}

export default function DataPolicyItem({
    policy,
    servicePolicies,
    setServicePolicies,
    hoverDisabled = false,
}: {
    policy: DataPolicy;
    servicePolicies?: string[];
    setServicePolicies?: React.Dispatch<React.SetStateAction<string[]>>;
    hoverDisabled?: boolean;
}) {

    if (!servicePolicies || !setServicePolicies) {
        return (
            <div className={`data-policy-item ${hoverDisabled ? "no-hover" : ""}`}>
                <MainComponent policy={policy} />
            </div>
        )
    }

    return (
        <div key={policy.id} className={`data-policy-item ${servicePolicies.includes(policy.id) ? "selected" : ""
            }`} onClick={() => {
                if (servicePolicies.includes(policy.id)) {
                    setServicePolicies(servicePolicies.filter(id => id !== policy.id));
                } else {
                    setServicePolicies([...servicePolicies, policy.id]);
                }
            }}>
            <MainComponent policy={policy} />
        </div>
    )
}