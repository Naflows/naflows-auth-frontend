

/* 
    This disclaimer is based on the "nass owned" parameter for the service data.
    If the service is "nass owned", then it is safe to join without further disclaimers. 
    However, if the service is not "nass owned", we need to display a disclaimer to the user, that they should be aware of the risks of joining third-party services.
*/

import GlobalDisclaimer from "@/global/components/GlobalDisclaimer";

export default function JoinServiceDisclaimer({
    nassOwned
}: {
    nassOwned: boolean;
}) {
    if (nassOwned) {
        return (
            <GlobalDisclaimer 
                title="Naflows Service Disclaimer"
                message="You are about to join a service owned and operated by Naflows. By joining this service, you agree to abide by Naflows's terms of service and privacy policies. Your data will be handled in accordance with Naflows's standards for security and privacy."
                allowHidden={true}
            />
        )
    }

    return (
        <GlobalDisclaimer 
            title="Third-Party Service Disclaimer"
            message="You are about to join a third-party service that is not owned or operated by Naflows. Please be aware that by joining this service, you may be subject to different terms of service, privacy policies, and data handling practices. Make sure to read and accept the service's terms and privacy policy. Naflows is not responsible for the actions or policies of third-party services. We recommend reviewing the service's terms and privacy policy before proceeding."
            allowHidden={false}
        />
    );
}