import Switch from "@/global/components/Switch";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import { useServiceData } from "../../../../layout";
import "@/public/root/pages/services/manage/sub-components/settings/index.scss";

const Tile = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
    return (
        <div className="content__tile">
            <div className="content__header">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className="content__body">
                {children}
            </div>
        </div>
    );
}


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
                    <div className="tab__content__header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                        </svg>


                        <h3>General Settings</h3>
                    </div>
                    <div className="tab__content__container">
                        <Tile
                            title="Enable Backups"
                            description="Automatically back up your service data at regular intervals."
                        >
                            <Switch
                                id="enable-backups-toggle"
                                label="Enable Backups"
                                checked={service.backup_enabled || false}
                                onChange={() => { /* Implement toggle logic here */ }}
                            />
                        </Tile>
                    </div>
                </div>

                <div className="tab__content__section">
                    <div className="tab__content__header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>

                        <h3>Security Settings</h3>
                    </div>
                    <div className="tab__content__container">
                        <Tile
                            title="Transfer Ownership"
                            description="Transfer the ownership of this service to another user. Please proceed with caution as this action is irreversible."
                        >
                            <button className="primary-button danger-button" onClick={() => {
                                window.location.href = `/modules/2FA?action=TRANSFER_OWNERSHIP&serviceID=${service.id}`;
                            }}>Transfer Ownership</button>
                        </Tile>
                        <Tile
                            title="Delete Service"
                            description="Permanently delete this service and all associated data. This action cannot be undone."
                        >
                            <button className="primary-button danger-button">Delete Service</button>
                        </Tile>
                    </div>
                </div>
            </div>
        )
    }
}

export default ServiceSettings;