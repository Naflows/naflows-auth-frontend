import Loader from "@/global/components/Loader";
import Switch from "@/global/components/Switch";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";

const ServiceSettings = ({
    service
}: {
    service: ServicesForUserProps | null
}) => {

    if (service) {

        const authorized = service.user_authorizations && service.user_authorizations["VIEW_SETTINGS"];

        if (!authorized) {
            return <UnauthorizedAccess />;
        }

        return (
            <div className="service__tab__content user__body__section">
                <div className="tab__content__section">
                    <Switch label="Enable Service" checked={service.status != "ACTIVE"} onChange={(value) => { return value }} description="Toggle to enable or disable the service" />
                </div>
            </div>
        )
    } else {
        return (
                <Loader loading={true} title="Loading service settings..." message="Please wait while the service settings are being loaded." />
        )
    }
}

export default ServiceSettings;