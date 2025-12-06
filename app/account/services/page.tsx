"use client";
import '@/public/root/pages/services/create/index.scss';

import "@/public/root/pages/account/sub-components/AccountServicesBody.scss";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { useEffect, useMemo, useState } from "react";
import ManageServiceConnection from "../sub-components/manage-connection";
import SearchService from "../sub-components/core/services/SearchBar";
import CompactServiceDescription from "./components/compact.view";
import Loader from "@/global/components/Loader";
import { useAccountData } from "../layout";
import { ServicesForUserProps } from '@/types/ServicesForUserProps';



const ServiceSVG = () => {
    return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
    </svg>)
}

const ConnectionSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
        </svg>

    )
}

export default function ServicesInitPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [serviceData, setServiceData] = useState<ServicesCompleteBodyProps | null>(null);
    const [servicesType, setServicesType] = useState<"services" | "connections">("services");

    const data = useAccountData();
    const servicesData = data.servicesFetch;


    useEffect(() => {
        console.log("ServicesInitPage render:");
        console.log("- servicesLoaded:", data.servicesLoaded);
        console.log("- servicesFetch length:", data.servicesFetch.length);
        console.log("- Loader showing:", data.servicesLoaded === false);
    }, [data.servicesLoaded, data.servicesFetch]);



    // Memoize filtered services
    const userServices = useMemo(() =>
        servicesData.filter((service) => service.is_user_developer === true),
        [servicesData]
    );

    const userConnections = useMemo(() =>
        servicesData.filter((service) => service.is_user_developer !== true),
        [servicesData]
    );

    // Compute displayed services based on type and search
    const displayedServices = useMemo(() => {
        const sourceServices = servicesType === "services" ? userServices : userConnections;

        if (!searchQuery) return sourceServices;

        return sourceServices.filter((service) =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [servicesType, searchQuery, userServices, userConnections]);

    return (
        <div className="user__body__services">

            <Loader
                loading={data.servicesLoaded === false}
                title="Loading services"
                message="Fetching services data from Naflows..."
            />


            <div className="user__body__services__header">
                <div className="services__header__tabs">
                    <button
                        className={`services__header__tab ${servicesType === "services" ? "primary-button" : "secondary-button"}`}
                        onClick={() => setServicesType("services")}
                    >
                        <ServiceSVG />
                        <span>
                            Your Services ({userServices.length})
                        </span>
                    </button>
                    <button
                        className={`services__header__tab ${servicesType === "connections" ? "primary-button" : "secondary-button"}`}
                        onClick={() => setServicesType("connections")}
                    >
                        <ConnectionSVG />
                        <span>
                            Your Connections ({userConnections.length})
                        </span>
                    </button>
                </div>
            </div>

            <ManageServiceConnection service={serviceData} />

            <div className="user__body__section" style={{
                display: servicesType === "services" ? "block" : "none",
            }}>
                <div className="services__list">
                    <div className="service__actions__field no-padding">
                        <div className="service__actions__field__header">
                            <div className="service__actions__field__title__icon">
                                <ServiceSVG />
                                <h3 className="service__actions__field__title">Your Services</h3>
                            </div>
                            <p>Services you own or manage. <a href="/docs/user-guide/about-services">Learn more</a>.</p>
                        </div>
                        <button
                            className="primary-button"
                            onClick={() => {
                                window.location.href = "/account/services/new";
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e3e3e3"
                            >
                                <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
                            </svg>
                            <span>New service</span>
                        </button>
                    </div>
                    <SearchService onSearch={setSearchQuery} />
                    <div className="services__list__content">
                        {displayedServices.length > 0 ? (
                            displayedServices.map((service) => (
                                <CompactServiceDescription key={service.id} service={service} owned={true} />
                            ))
                        ) : (
                            <p>No services found.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="user__body__section" style={{
                display: servicesType === "connections" ? "block" : "none",
            }}>
                <div className="services__list">
                    <div className="service__actions__field no-padding">
                        <div className="service__actions__field__header">
                            <div className="service__actions__field__title__icon">
                                <ConnectionSVG />

                                <h3>Your Connections</h3>
                            </div>
                            <p>Services you're connected to. Manage their permissions and settings. <a href="/docs/user-guide/about-connections">Learn more</a>.</p>
                        </div>
                        <button className="secondary-button inactive"
                            onClick={() => {
                                window.location.href = "/account/services/new-connection";
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                                <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
                            </svg>

                            <span>Naflows Directory</span>
                        </button>
                    </div>
                    <SearchService onSearch={setSearchQuery} />
                    <div className="services__list__content">
                        {displayedServices.length > 0 ? (
                            displayedServices.map((service) => (
                                <CompactServiceDescription key={service.id} service={service} owned={false} />
                            ))
                        ) : (
                            <p>No connections found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}