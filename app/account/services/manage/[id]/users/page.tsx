'use client';

import { useState } from "react";
import '@/public/root/pages/services/manage/sub-components/UsersList.scss';
import useFetchUserList from "./scripts/fetch-user-list";
import ListedUser from "./components/user";
import {  ServiceUser } from "@/types/ServicesForUserProps";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import Loader from "@/global/components/Loader";
import { useServiceData } from "../layout";



export default function ServiceUsers() {
    const { service } = useServiceData() || {};
    const [users, setUsers] = useState<ServiceUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const authorized = service?.user_authorizations && service.user_authorizations["VIEW_USERS"];

    useFetchUserList(authorized && service ? service.id : "", setUsers, setLoading, setErrorMessage);


    if (!authorized) {
        return (
            <>
                <UnauthorizedAccess />
            </>
        )
    }

    return (
        <div className="user__body__section">

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

