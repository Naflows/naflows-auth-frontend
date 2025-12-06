import Loader from "@/global/components/Loader";
import Switch from "@/global/components/Switch";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";
import { useServiceData } from "../../../../layout";

const ServiceSettings = () => {

    const { service } = useServiceData() || {};

    if (service) {

        const authorized = service.user_authorizations && service.user_authorizations["VIEW_SETTINGS"];

        if (!authorized) {
            return <UnauthorizedAccess />;
        }

        return (
            <div className="service__tab__content user__body__section">
                <div className="tab__content__section">
                    <Switch label="Enable Service" checked={service.status != "ACTIVE"} onChange={(value) => { return value }} description="Toggle to enable or disable the service" />
                    <Switch label="Enable Backups" checked={service?.backup_enabled || false} onChange={(value) => { return value }} description="Toggle to enable or disable automatic backups for this service." />
                </div>

            </div>
        )
    }
}

export default ServiceSettings;