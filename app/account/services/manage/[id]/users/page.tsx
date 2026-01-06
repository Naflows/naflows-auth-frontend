'use client';

import { useEffect, useState } from "react";
import '@/public/root/pages/services/manage/sub-components/UsersList.scss';
import useFetchUserList from "./scripts/fetch-user-list";
import ListedUser from "./components/user";
import { ServiceUser } from "@/types/ServicesForUserProps";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import Loader from "@/global/components/Loader";
import { useServiceData } from "../layout";
import GlobalDisclaimer from "@/global/components/GlobalDisclaimer";



export default function ServiceUsers() {
    const { service } = useServiceData() || {};
    const [users, setUsers] = useState<ServiceUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const authorized = service?.user_authorizations && service.user_authorizations["VIEW_USERS"];

    useFetchUserList(authorized && service ? service.id : "", setUsers, setLoading, setErrorMessage);
    const [publicAccess, setPublicAccess] = useState<boolean>(false);


    useEffect(() => {
        if (service && service.public_settings && typeof service.public_settings.allow_user_registration === "boolean") {
            setPublicAccess(service.public_settings.allow_user_registration);
        }
    }, [service]);

    if (!service) {
        return <Loader loading={true} title="Loading Service Users" message="Please wait while we fetch the service information." />;
    }


    if (!authorized) {
        return (
            <>
                <UnauthorizedAccess />
            </>
        )
    }

    return (
        <div className="user__body__section">
            <div id="access_advisory" style={{
                display: publicAccess ? "none" : "block",
                width: "100%",
            }}>
                <GlobalDisclaimer
                    title="Access Advisory"
                    message="This service does not allow public user registration. Only users invited by an administrator can access this service."
                    classes="row-display"
                    content={<>
                        <button className="secondary-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                            </svg>
                            <span>
                                Invite Users
                            </span>
                        </button>
                    </>}
                />

            </div>


            <div className="users__list">
                {loading ? (
                    <Loader loading={true} title="Loading users..." message="Please wait while the users are being loaded." />
                ) : (
                    users.length > 0 ? (
                        users.map((user) => (
                            <ListedUser key={user.id} user={user} service={service} />
                        ))
                    ) : (
                        <>
                            <span>
                                {errorMessage ? errorMessage : "No users found for this service."}
                            </span>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

