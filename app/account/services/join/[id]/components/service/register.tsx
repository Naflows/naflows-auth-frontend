import Switch from "@/global/components/Switch";
import manage2FAAction from "@/scripts/modules/2FA/manage-action";
import requestExists from "@/scripts/modules/2FA/request-exists";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";


export default function RegisterComponent({
    service, consentGiven,
    setConsentGiven
}: {
    service: ServicesBodyProps,
    consentGiven: { [key: string]: boolean },
    setConsentGiven: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
}) {
    return (
        <div className="global__information__section" style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <Switch
                label={`I agree to join ${service.name} and accept their policies.`}
                checked={consentGiven[service.id] || false}
                onChange={(checked) => {
                    if (checked == consentGiven[service.id]) return;

                    setConsentGiven((prev) => ({
                        ...prev,
                        [service.id]: checked,
                    }));
                }}
                description=""
            />
            <button className={`primary-button enhanced-max ${!consentGiven[service.id] ? "inactive" : ""}`} onClick={async () => {
                const result = await manage2FAAction("JOIN_SERVICE", service.id, `/account/services/join/${service.id}`);
                if (result) {
                    alert("Registering to the service...");
                }
            }}>
                <span>Join {service.name}</span>
            </button>
        </div>
    )
}