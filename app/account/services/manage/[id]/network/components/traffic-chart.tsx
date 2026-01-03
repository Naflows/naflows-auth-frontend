import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";
import { ServiceTraffic } from "@/types/TrafficTypes";
import { Chart } from "chart.js/auto";
import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { fetchNetworkData } from "@/scripts/pages/services/get/fetch-network";
import UseUpdateChart from "./utils/useUpdateChart";

type OverWhelmStatus = "normal" | "warning" | "shutdown";

const OverwhelmText: Record<OverWhelmStatus, string> = {
    normal: "Your service is operating within normal traffic limits.",
    warning: "Your service is overwhelmed due to high traffic. Naflows is automatically scaling your service to handle the increased load.",
    shutdown: "Naflows is shutting down your service due to excessive traffic. Please try again later."
};

const TrafficOverview = ({
    service,
}: {
    service: ServicesForUserProps | ServicesCompleteBodyProps | null;
}) => {


    const [traffic, setTraffic] = useState<ServiceTraffic | null>(null);
    const [isServiceOverwhelmed, setIsServiceOverwhelmed] = useState<"normal" | "warning" | "shutdown">("normal");
    const [updateTraffic, setUpdateTraffic] = useState<boolean>(true);

    useEffect(() => {
        if (updateTraffic) {
            const fetchData = async () => {
                const trafficData = await fetchNetworkData(service?.id || "");
                console.log("Fetched traffic data:", trafficData);
                setTraffic(trafficData.traffic);
                setIsServiceOverwhelmed(trafficData.overwhelmed ? "shutdown" : "normal");

                setUpdateTraffic(false);
                // Use chartjs to render traffic data on canvas with id "trafficChart"
            };
            fetchData();
        }
    }, [updateTraffic])

    const chartRef = useRef<Chart | null>(null);



    UseUpdateChart({
        traffic,
        service,
        updateTraffic,
        chartRef
    });

    useEffect(() => {
        const interval = window.setInterval(() => {
            setUpdateTraffic(true);
        }, 1000*5); // Update every 5 seconds

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    return (
        <div className="traffic-overview">
            <div className="service__actions__field__header">
                <h3 className="service__actions__field__title">Traffic</h3>
                <p className="service__actions__field__description">Monitor the network traffic of your service to ensure optimal performance and security.</p>
            </div>
            <div className="network__traffic__placeholder">

                <div className={`network__information__container`}>
                    <div className={`network__information ${isServiceOverwhelmed}`}>
                        {OverwhelmText[isServiceOverwhelmed]}
                    </div>
                    <canvas id="trafficChart"></canvas>

                </div>


                <div className="traffic__chart__details">
                    <p className="footer__informations">
                        The traffic chart displays the number of requests per second (RPS) made to your service over time, categorized by user type. Monitoring this data helps you understand usage patterns and ensure your service operates within its allocated limits. If you notice spikes or unusual activity, consider reviewing your service&apos;s configuration or scaling options.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TrafficOverview;