"use client";

import Loader from "@/global/components/Loader";
import { useServiceData } from "./layout";
import ManageServiceOverview from "./components/overview";
import LatestLogs from "./components/overview/components/latest-logs";
import ServiceRightsComponentGlobal from "./components/overview/components/users/rights";
import ServiceNetwork from "./components/overview/components/network";
import ServiceUsers from "./components/overview/components/users";
import Safety from "./components/overview/components/safety";


export default function ManageServicePage() {

    const { service, tab, setService } = useServiceData() || {};

    if (!service || !tab) {
        return (
            <Loader loading={true} title="Loading service data" message="Fetching service informations..." />
        );
    }

    switch (tab) {
        case "overview":
            return (
                <ManageServiceOverview service={service} setService={setService || (() => {})} />
            )
        case "logs" :
            return (
                <LatestLogs service={service} />
            )
        case "rights":
            return (
                <ServiceRightsComponentGlobal service={service} />
            )
        case "network":
            return (
                <ServiceNetwork service={service} />
            )
        case "users":
            return <ServiceUsers service={service} />;
        case "safety":
            return <Safety service={service} />;
    }

    return (
        <div className="account__services__manage__page">
            Manage specific service here.
        </div>
    );
}