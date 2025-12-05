import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";
import { ServiceTraffic } from "@/types/TrafficTypes";
import { useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function UseUpdateChart({
    traffic,
    service,
    updateTraffic,
    chartRef
}: {
    traffic: ServiceTraffic | null;
    service: ServicesCompleteBodyProps | ServicesForUserProps | null;
    updateTraffic: boolean;
    chartRef: React.MutableRefObject<import("chart.js/auto").Chart | null>;
}) {

    useEffect(() => {
        if (!traffic?.requests?.length) return;

        const canvas = document.getElementById("trafficChart") as HTMLCanvasElement;
        if (!canvas) return;

        // Process both types
        const types: ("USER" | "DEVELOPER")[] = ["USER", "DEVELOPER"];
        const datasets = types.map((type) => {
            // Filter and sort requests by type
            const sortedRequests = traffic.requests
                .filter(req => req.type === type)
                .sort((a, b) => a.timestamp - b.timestamp);

            // Calculate RPS by binning into 1-minute intervals
            const rpsMap = new Map<number, number>();

            sortedRequests.forEach(req => {
                const minuteBin = Math.floor(req.timestamp / 60000) * 60000;
                rpsMap.set(minuteBin, (rpsMap.get(minuteBin) || 0) + 1);
            });


            return { type, rpsMap };
        });

        // Get all unique time bins
        const allBins = new Set<number>();
        datasets.forEach(({ rpsMap }) => {
            rpsMap.forEach((_, bin) => allBins.add(bin));
        });

        const sortedBins = Array.from(allBins).sort((a, b) => a - b);
        const labels = sortedBins.map(bin => new Date(bin));

        // Create datasets with data for each bin
        const chartDatasets = datasets.map(({ type, rpsMap }) => {
            const colors = {
                USER: { border: "rgba(75, 192, 192, 1)", bg: "rgba(75, 192, 192, 0.1)" },
                DEVELOPER: { border: "rgba(153, 102, 255, 1)", bg: "rgba(153, 102, 255, 0.1)" }
            };
            const color = colors[type];

            return {
                label: `${type} - RPS`,
                data: sortedBins.map(bin => (rpsMap.get(bin) || 0)),
                borderColor: color.border,
                backgroundColor: color.bg,
                borderWidth: 2,
                tension: 0.1,
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: color.border,
                pointBorderColor: "#fff",
                pointBorderWidth: 1,
            };
        });

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const roundedMaxRPS = (service?.settings?.rates || 100) * 1.5;
        const min = roundedMaxRPS;
        // If the RPS are too low, set max to 10^next highest power of 10


        chartRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    // ensure each dataset from chartDatasets fills the area under the line
                    ...chartDatasets.map(ds => ({ ...ds, fill: true })),
                    {
                        label: `RPS Limit (${service?.settings?.rates || 100})`,
                        data: labels.map(() => (service?.settings?.rates || 100)),
                        borderColor: "rgba(255, 99, 132, 0.6)",
                        backgroundColor: "rgba(255, 99, 132, 0.12)",
                        borderWidth: 2,
                        tension: 0.1,
                        fill: false,
                        pointRadius: 0,
                        borderDash: [6, 4],
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Traffic Performance - Requests Per Second",
                    },
                },
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "minute",
                            displayFormats: {
                                minute: "HH:mm",
                            },
                        },
                        title: {
                            display: true,
                            text: "Time",
                        },
                    },
                    y: {
                        beginAtZero: true,
                        max: (min || 1), // Set max to double the RPS limit
                        title: {
                            display: true,
                            text: "RPS",
                        },
                    },
                },
            },
        });


        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [traffic, updateTraffic]);
}