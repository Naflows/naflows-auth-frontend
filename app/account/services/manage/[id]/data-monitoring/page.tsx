"use client";
import Loader from "@/global/components/Loader";
import { useServiceData } from "../layout";
import '@/public/root/pages/services/manage/data-monitoring/index.scss';
import DataMonitoringNoDataSet from "./components/collected-data/no-data";
import ServiceDataMonitoringPolicy from "./components/collected-data/data-set";
import { categories } from "./setup/utils/policies";

export default function DataMonitoringPage() {

    const serviceData = useServiceData();
    const service = serviceData?.service;

    if (!service) {
        return (
            <Loader
                message="Loading service data..."
                responsive={false}
                title="Data Monitoring"
                loading={true}
            />
        );
    }


    return (
        <div className="data-monitoring-page">
            <div className="user__body__section service__overview__tab__content" id="data-collection-section">
                <div className="service__overview__tab__header">
                    <h2>Collected Data</h2>
                    <p>
                        Define what data your service will monitor from their user and collect from the NASS. <a href="https://docs.nass.dev/services/data-monitoring" target="_blank" rel="noreferrer">Learn more</a>.
                    </p>
                </div>

                <div className="data-collection-content global__container">
                    <DataMonitoringNoDataSet display={service?.public_settings?.required_data?.length === 0} />

                    <ServiceDataMonitoringPolicy policies={service?.public_settings?.required_data || []} />

                    <button className="primary-button width-100-auto" onClick={() => {
                        // Go to ./setup/
                        window.location.href = `/account/services/manage/${service.id}/data-monitoring/setup`;
                    }}>
                        <span>Set Data Collection Policies</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>


                    </button>

                </div>
            </div>
            <div className="user__body__section service__overview__tab__content even-height">
                <div className="service__overview__tab__header">
                    <h2>Data Monitoring</h2>
                    <p>Monitor your service data and analytics in real-time.</p>
                </div>
            </div>
        </div>
    );
}