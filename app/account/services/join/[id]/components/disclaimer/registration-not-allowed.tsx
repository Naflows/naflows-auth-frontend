import { ServicesBodyProps } from "@/types/ServicesBodyProps"

export function ServiceRegistrationNotAllowedDisclaimer({
    naflows_allows_registration
} : {
    naflows_allows_registration?: ServicesBodyProps["details"]["naflows_allows_registration"];
}) {

    if (naflows_allows_registration &&naflows_allows_registration.approved) {
        return null;
    }

    return (
        <div className="disclaimer__box disclaimer__box--error">
            <h3>Registration Not Allowed</h3>
            <p>
                Unfortunately, registration for this service is currently not allowed.
                This may be due to the service's policies or restrictions set by the administrators.
            </p>
            <p>
                If you believe this is an error or have any questions, please contact the service support team for further assistance.
            </p>
        </div>
    )
}