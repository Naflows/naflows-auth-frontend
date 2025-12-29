'use client';


import Switch from "@/global/components/Switch";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import { useServiceData } from "../layout";
import "@/public/root/pages/services/manage/sub-components/settings/index.scss";
import requestExists from "@/scripts/modules/2FA/request-exists";
import { useState } from "react";

const Tile = ({ title, description, children, badge }: { title: string; description: string; children: React.ReactNode, badge?: React.ReactNode }) => {
    const badgeClass = badge ? "with-badge" : "without-badge";

    return (
        <div className={`content__tile ${badgeClass}`}>
            <div className="content__header">
                {badge}
                <h4>
                    {title}
                </h4>
                <p>{description}</p>
            </div>
            <div className="content__body">
                {children}
            </div>
        </div>
    );
}


export default function ServiceSettings() {

    const { service } = useServiceData() || {};

    const [onFetchLoading, setOnFetchLoading] = useState<string>("");

    if (service) {
        console.log("Rendering ServiceSettings with service:", service);
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
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                        </svg>

                        <h3>Legal Settings</h3>
                    </div>

                    <div className="tab__content__container">
                        <Tile
                            title="Data Policy"
                            description="Update your service's data retention policy to comply with legal requirements and inform your users."
                            badge={
                                <span className="badge badge--info" style={{
                                    display: service.details.public.privacy_policy_url?.approved || service.details.public.privacy_policy_url?.value === "null" ? 'flex' : 'none'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                    </svg>

                                    <p>
                                        {service.details.public.privacy_policy_url?.value === 'null' ? "Please complete" : "Pending Approval"}
                                    </p>
                                </span>
                            }
                        >
                            <button className="primary-button" onClick={() => {
                                window.location.href = `/account/services/manage/${service.id}/settings/legal/upload/privacy-policy`;
                            }}>
                                Manage Data Policy
                            </button>
                        </Tile>

                        <Tile
                            title="Service Terms"
                            description="Review and update your service's terms of service to ensure clarity and legal compliance."
                            badge={
                                <span className="badge badge--info" style={{
                                    display: service.details.public.terms_of_service_url?.approved || service.details.public.terms_of_service_url?.value === "null" ? 'flex' : 'none'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                    </svg>

                                    <p>
                                        {service.details.public.terms_of_service_url?.value === 'null' ? "Please complete" : "Pending Approval"}
                                    </p>
                                </span>
                            }
                        >
                            <button className="primary-button" onClick={() => {
                                window.location.href = `/account/services/manage/${service.id}/settings/legal/upload/terms-of-service`;
                            }}>
                                Manage Service Terms
                            </button>
                        </Tile>

                        <Tile
                            title="Support Email"
                            description="Set or update the support email address for your service to ensure users can reach out for assistance."
                            badge={
                                <span className="badge badge--info" style={{
                                    display: service.details.public.contact_email?.approved || service.details.public.contact_email?.value === "null" ? 'flex' : 'none'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                    </svg>

                                    <p>
                                        {service.details.public.contact_email?.value === 'null' ? "Please complete" : "Pending Approval"}
                                    </p>
                                </span>
                            }
                        >
                            <button className="primary-button" onClick={() => {
                                window.location.href = `/account/services/manage/${service.id}/settings/legal/upload/support-contact`;
                            }}>
                                Manage Support Contact
                            </button>
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
                            <button className="primary-button danger-button" onClick={async () => {
                                setOnFetchLoading("TRANSFER_OWNERSHIP");
                                const r = await requestExists({
                                    action: "TRANSFER_OWNERSHIP",
                                    data: {
                                        serviceID: service.id
                                    }
                                })
                                console.log("Request exists response:", r);
                                if (!r.success) {
                                    console.log("Redirecting to 2FA module for ownership transfer...");
                                    window.location.href = `/modules/2FA?action=TRANSFER_OWNERSHIP&serviceID=${service.id}&redirect=/account/services/manage/${service.id}/settings/transfer-ownership`;

                                } else {
                                    window.location.href = '/account/services/manage/' + service.id + '/settings/transfer-ownership';
                                }
                                setOnFetchLoading("");
                            }}>
                                {onFetchLoading === "TRANSFER_OWNERSHIP" ? "Processing..." : "Transfer Ownership"}
                            </button>
                        </Tile>
                        <Tile
                            title="Delete Service"
                            description="Permanently delete this service and all associated data. This action cannot be undone."
                        >
                            <button className="primary-button danger-button" onClick={async () => {
                                setOnFetchLoading("DELETE_SERVICE");
                                const r = await requestExists({
                                    action: "DELETE_SERVICE",
                                    data: {
                                        serviceID: service.id
                                    }
                                })
                                console.log("Request exists response:", r);
                                if (!r.success) {
                                    console.log("Redirecting to 2FA module for service deletion...");
                                    window.location.href = `/modules/2FA?action=DELETE_SERVICE&serviceID=${service.id}&redirect=/account/services/manage/${service.id}/settings/delete-service`;

                                } else {
                                    window.location.href = '/account/services/manage/' + service.id + '/settings/delete-service';
                                }
                                setOnFetchLoading("");
                            }}>
                                {onFetchLoading === "DELETE_SERVICE" ? "Processing..." : "Delete Service"}
                            </button>
                        </Tile>
                    </div>
                </div>
            </div>
        )
    }
}

