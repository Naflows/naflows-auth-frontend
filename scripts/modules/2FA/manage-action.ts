import requestExists from "./request-exists";


export default async function manage2FAAction(action: "TRANSFER_OWNERSHIP" | "CHANGE_SECURITY_SETTINGS" | "DELETE_ACCOUNT" | "CUSTOM_ACTION" | "DELETE_SERVICE" | "JOIN_SERVICE", serviceID?: string, redirectURL?: string) : Promise<boolean | void> {
    const r = await requestExists({
        action: action,
        data: {
            serviceID: serviceID
        }
    })

    if (!r.success) {
        console.log("Redirecting to 2FA module for ownership transfer...");
        const baseLink = '/modules/2FA?action=' + action;
        const redirect = redirectURL ? redirectURL : window.location.href;
        window.location.href = `${baseLink}&redirect=${encodeURIComponent(redirect)}${serviceID ? `&serviceID=${serviceID}` : ''}`;
    } else {
        return true;
    }
}