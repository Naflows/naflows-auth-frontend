"use client";

import Loader from "@/global/components/Loader";
import { useServiceData } from "./layout";


export default function ManageServicePage() {

    const { service, tab } = useServiceData();

    if (!service) {
        return (
            <Loader loading={true} title="Loading service data" message="Fetching service informations..." />
        );
    }

    return (
        <div className="account__services__manage__page">
            Manage specific service here.
        </div>
    );
}