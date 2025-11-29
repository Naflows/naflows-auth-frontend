"use client";
import "@/public/root/pages/account/sub-components/AccountServicesBody.scss";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { useEffect, useMemo, useState } from "react";
import ManageServiceConnection from "../sub-components/manage-connection";
import SearchService from "../sub-components/core/services/SearchBar";
import CompactServiceDescription from "./components/compact.view";
import { getAllServices } from "@/scripts/pages/services/get/get-all";
import Loader from "@/global/components/Loader";
import { useAccountData } from "../layout";

export default function ServicesInitPage() {
    const [servicesData, setServicesData] = useState<ServicesBodyProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [serviceData, setServiceData] = useState<ServicesCompleteBodyProps | null>(null);
    const [servicesType, setServicesType] = useState<"services" | "connections">("services");
    
    const { userFetch } = useAccountData();

    // Fetch services once user is loaded
    useEffect(() => {
        if (!userFetch || !userFetch.id) {
            return;
        }

        let ignore = false; // ADD THIS LINE
        const controller = new AbortController();

        const fetchServices = async () => {
            setLoading(true);
            try {
                const services = await getAllServices(controller.signal);
                if (!ignore && services?.data?.services) {
                    console.log("Fetched services:", services);
                    setServicesData(services.data.services);
                }
            } catch (error) {
                if (!ignore && error instanceof Error && error.name !== 'CanceledError') {
                    console.error("Error fetching services:", error);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchServices();

        return () => {
            ignore = true; // ADD THIS LINE
            controller.abort();
        };
    }, [userFetch]);

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
        <div className="user__body__services nass__page">
            {loading && (
                <Loader 
                    loading={loading} 
                    title="Loading services" 
                    message="Fetching services data from Naflows..." 
                />
            )}

            <div className="user__body__services__header">
                <div className="services__header__tabs">
                    <button
                        className={`services__header__tab ${servicesType === "services" ? "primary-button" : "secondary-button"}`}
                        onClick={() => setServicesType("services")}
                    >
                        Your Services ({userServices.length})
                    </button>
                    <button
                        className={`services__header__tab ${servicesType === "connections" ? "primary-button" : "secondary-button"}`}
                        onClick={() => setServicesType("connections")}
                    >
                        Your Connections ({userConnections.length})
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
                            <h3 className="service__actions__field__title">Your Services</h3>
                            <p>Services you own or manage. <a href="/docs/user-guide/about-services">Learn more</a>.</p>
                        </div>
                        <button
                            className="primary-button"
                            onClick={() => {
                                window.location.href = "/services/new";
                            }}
                            style={{
                                width: 'fit-content',
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
                            <h3 className="service__actions__field__title">Your Connections</h3>
                            <p>Services you're connected to. <a href="/docs/user-guide/about-connections">Learn more</a>.</p>
                        </div>
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