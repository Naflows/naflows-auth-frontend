"use client";
import { use, useEffect, useState, createContext, useContext, useRef } from "react";
import { useAccountData } from "@/app/account/layout";
import canUserAccessService from "@/scripts/pages/services/user/can-access";
import fetchServiceData from "@/scripts/account/fetch-individual-service";
import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { dirValues, SERVICE_OVERVIEW_TABS, ServiceOverviewTabs } from "@/types/ServiceManagement";


import '@/public/root/pages/services/manage/index.scss';


import { AxiosError } from "axios";
import { NotificationProvider } from "@/global/action-information/NotificationContent";
import NotificationContainer from "@/global/action-information/NotificationContainer";
import AccountDirectory from "../../components/service-directory";
import SwitchServiceDirectoryIcon from "../../components/util/switch-service-directory-icon";

const ServiceDataContext = createContext<{
    service: ServicesCompleteBodyProps | null;
    tab: ServiceOverviewTabs;
    setService?: React.Dispatch<React.SetStateAction<ServicesCompleteBodyProps | null>>;
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
    // Get tab from URL directly instead of props
    const [tab, setTab] = useState<ServiceOverviewTabs>(new URL(window.location.href).pathname.split('/')[5] as ServiceOverviewTabs || paramsResolved.tab);
    const { userFetch, servicesFetch } = useAccountData();
    const [serviceData, setServiceData] = useState<ServicesCompleteBodyProps | null>(null);



    useEffect(() => {
        if (!userFetch || !userFetch.id || !servicesFetch) {
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

                console.log(`--- Access Check for Service ID: ${id} ---`);

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
    }, [id, userFetch, servicesFetch]);


    const sideBarRef = useRef(null);
    useEffect(() => {
        // Ensure once loaded that the sidebar width fits the header width 
        const header = document.querySelector('.nass__account__page__header');
        if (header && sideBarRef.current) {
            sideBarRef.current.style.left = `${header.clientWidth+1}px`;
        }
    }, []);

    return (
        <NotificationProvider>
            <ServiceDataContext.Provider value={{ service: serviceData, tab }} >
                <div className="user__body__manage-service">
                    <div className="service__overview__tabs" ref={sideBarRef}>
                        <div className="service__small__view">
                            <img src={serviceData?.banner || "/default-service-banner.png"} alt="Service Banner" className="service__banner" />
                            <img src={serviceData?.picture || "/default-service-image.png"} alt="Service" className="service__small__view__image" />
                            <div className="service__small__view__info">
                                <div className="service__small__view__info__name">
                                    {serviceData?.name || "Loading..."}
                                </div>
                                <a  href={serviceData?.dns} className="service__small__view__info__dns">
                                    {serviceData?.dns || "Loading..."}
                                </a>
                            </div>
                        </div>
                        <div className="tabs__content">
                            {SERVICE_OVERVIEW_TABS.map((tab_) => (
                                <a
                                    key={tab_.id}
                                    className={`tab ${tab === tab_.id ? "primary-button" : "secondary-button"}`}
                                    style={{
                                        width: "100%"
                                    }}
                                    href={`/account/services/manage/${id}/${tab_.id}`}
                                >
                                    {SwitchServiceDirectoryIcon({ currentTab: tab_.id })}
                                    <span>
                                        {tab_.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="account__services__manage__layout nass__service__page">

                        <AccountDirectory service={serviceData} tab={tab} title={dirValues[tab]?.title || "Service Management"} description={dirValues[tab]?.description || ""} />
                        {children}
                    </div>
                </div>
                <NotificationContainer />
            </ServiceDataContext.Provider>
        </NotificationProvider>
    );
}