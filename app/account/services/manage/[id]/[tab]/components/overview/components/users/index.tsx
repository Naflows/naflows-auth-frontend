import { useState } from "react";
import type { ServiceOverviewTabs } from "../../types/tabs.type";
import '@/public/root/pages/services/manage/sub-components/UsersList.scss';
import useFetchUserList from "./scripts/fetch-user-list";
import ListedUser from "./components/user";
import { ServicesForUserProps, ServiceUser } from "@/types/ServicesForUserProps";
import UnauthorizedAccess from "@/global/components/Unauthorized";
import Loader from "@/global/components/Loader";
import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";



const ServiceUsers = ({
    service
}: {
    service: ServicesForUserProps | ServicesCompleteBodyProps | null;
}) => {
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

export default ServiceUsers;