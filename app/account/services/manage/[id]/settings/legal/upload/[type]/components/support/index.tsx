import GlobalDisclaimer from "@/global/components/GlobalDisclaimer";
import Input from "@/global/components/Input";



export default function UploadServiceSupportContact() {
    return (
        <div className="account__services__manage__settings__page">
            <GlobalDisclaimer
                title="Special policies regarding your service's support contact"
                content={
                    <>
                        <p>Before uploading a support contact email, please ensure you agree to the following policies:</p>
                        <ul>
                            <li>The support contact email must be actively monitored to assist users with their issues.</li>
                            <li>Responses to user inquiries should be timely and professional.</li>
                            <li>The support contact email should not be used for marketing or promotional purposes.</li>
                            <li>Users' privacy must be respected, and any personal information collected should be handled in accordance with applicable data protection laws.</li>
                            <li>
                                If your support does not reply to user inquiries within a reasonable timeframe of {48 * 1.5} hours, we reserve the right to remove your service from our platform until the issue is resolved.
                            </li>
                        </ul>
                        <p>
                            By uploading a support contact email, you acknowledge and agree to comply with these policies to ensure a positive experience for your service users.
                            <br />
                            Naflows will be the intermediary for support requests, forwarding user inquiries to the provided support contact email.

                        </p>
                    </>
                }
                message=""
            />
            <div className="support-contact__form">
                <div className="inputs__content">
                    <Input
                        label="Support Contact Email"
                        type="email"
                        name="Support Contact Email"
                        required={true}
                        fitContent={false}
                    />

                    <button className="primary-button">Save</button>
                </div>
                <p>
                    Naflows will send a confirmation email to the provided address.
                </p>
            </div>
        </div>
    )
}