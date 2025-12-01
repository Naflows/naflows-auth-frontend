"use client";
import { use, useEffect, useState, createContext, useContext } from "react";
import { useAccountData } from "@/app/account/layout";
import canUserAccessService from "@/scripts/pages/services/user/can-access";
import AccountDir from "../../../components/ServiceDir";
import fetchServiceData from "@/scripts/account/fetch-individual-service";
import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { dirValues, SERVICE_OVERVIEW_TABS, ServiceOverviewTabs } from "@/types/ServiceManagement";


import '@/public/root/pages/services/manage/index.scss';


import { AxiosError } from "axios";
import { NotificationProvider } from "@/global/action-information/NotificationContent";
import NotificationContainer from "@/global/action-information/NotificationContainer";

const ServiceDataContext = createContext<{
    service: ServicesCompleteBodyProps | null;
    tab: ServiceOverviewTabs;
} | null>(null);

export function useServiceData() {
    return useContext(ServiceDataContext);
}

export default function ServiceManagementPage({
    params, children
}: {
    params: Promise<{ id: string, tab: ServiceOverviewTabs }>;
    children: React.ReactNode;
}) {
    const paramsResolved = use(params);
    const id = paramsResolved.id;
    const tab = paramsResolved.tab;
    const { userFetch } = useAccountData();
    const [serviceData, setServiceData] = useState<ServicesCompleteBodyProps | null>(null);

    useEffect(() => {
        if (!userFetch || !userFetch.id) {
            console.log("User data not available yet in layout.");
            return;
        }

        let ignore = false; // ✅ ADD THIS
        const accessController = new AbortController(); // Fixed typo: accessControler → accessController
        const controller = new AbortController();

        async function checkAccess() {
            try {
                const canAccess = await canUserAccessService(id, accessController.signal);

                if (ignore) return; // ✅ Check before state updates

                console.log("Access check result:", canAccess);

                if (!canAccess) {
                    console.log("User does not have access to this service. Redirecting...");
                    //window.location.href = "/account/services";
                } else {
                    console.log("User has access to this service.");
                    const serviceData = await fetchServiceData(id, controller.signal);

                    if (!ignore) { // ✅ Check before state update
                        setServiceData(serviceData);
                    }
                }
            } catch (error: AxiosError | unknown) {
                if (ignore) return; // ✅ Don't log errors if component unmounted

                if (error.name === 'CanceledError' || error.name === 'AbortError') {
                    console.log("Request aborted");
                } else {
                    console.error("Error checking access:", error);
                    if (error.response?.status === 401) {
                        console.log("Unauthorized access. Redirecting to services page.");
                        //window.location.href = "/account/services";
                    }
                }
            }
        }

        checkAccess();

        return () => {
            ignore = true; // ✅ ADD THIS
            accessController.abort();
            controller.abort();
        };
    }, [id, userFetch]);

    return (
        <NotificationProvider>
            <ServiceDataContext.Provider value={{ service: serviceData, tab }} >
                <div className="user__body__manage-service">
                    <div className="account__services__manage__layout nass__service__page">
                        <div className="service__overview__tabs">
                            {SERVICE_OVERVIEW_TABS.map((tab_) => (
                                <button
                                    key={tab_.id}
                                    className={`tab ${tab === tab_.id ? "primary-button" : "secondary-button"}`}
                                    style={{
                                        width: "100%"
                                    }}
                                    onClick={() => {
                                        window.location.href = `/account/services/manage/${id}/${tab_.id}`;
                                    }}
                                >
                                    {tab_.label}
                                </button>
                            ))}
                        </div>
                        <AccountDir service={serviceData} tab={tab} title={dirValues[tab]?.title || "Service Management"} description={dirValues[tab]?.description || ""} />
                        {children}
                    </div>
                </div>
                <NotificationContainer />
            </ServiceDataContext.Provider>
        </NotificationProvider>
    );
}