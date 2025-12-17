import { useEffect, useState } from "react";
import LogUserDetails from "./components/user-details";
import FilterLogs from "./components/filters";
import { Filters, Log } from "@/types/Logs.type";
import Loader from "@/global/components/Loader";
import { getLogs } from "@/scripts/pages/services/get/get-logs";
import { useServiceData } from "../../../../../layout";
import LogsDirectory from "./components/directory";
import SingleLog from "./components/log.single";



const LatestLogs = () => {

    const [logs, setLogs] = useState<Log[]>([]);
    const [totalLogs, setTotalLogs] = useState<number>(0);
    const [totalTabs, setTotalTabs] = useState<number>(0);

    const [isError, setIsError] = useState(false);
    const [hoveredLog, setHoveredLog] = useState<Log | null>(null);

    const [offset, setOffset] = useState<number>(0);

    const [filters, setFilters] = useState<Filters>({
        dateFrom: null,
        dateTo: null,
        type: null,
        level: null,
        user: null
    });

    const serviceData = useServiceData();
    const service = serviceData?.service;

    async function fetchLogs() {
        // Ensure service is defined before fetching logs
        if (!service) {
            setIsError(true);
            return;
        }

        setLogs([]);
        setIsError(false);


        const logs = await getLogs(service?.id, offset, filters);
        if (!logs) {
            setIsError(true);
            return;
        } else {
            setLogs(logs.logs);
            setTotalLogs(logs.total);
            setTotalTabs(logs.tabs);
        }
    }

    useEffect(() => {


        if (service) {
            async function loadLogs() {
                await fetchLogs();
            }
            loadLogs();
        }

    }, [service, offset, filters]);

    if (!service) {
        return (
            <div className="logs__container">
                <Loader loading={false} title="Loading service..." message="Please wait while the service data is being loaded." />
            </div>
        )
    }

    return (
        <div className="logs__container">
            <FilterLogs filters={filters} setFilters={setFilters} />

            <LogsDirectory
                totalLogs={totalLogs}
                totalTabs={totalTabs}
                offset={offset}
                setOffset={setOffset}
                isError={isError}
            />

            {
                logs.length === 0 && !isError && (
                    <Loader loading={false} title="Loading logs..." message="Please wait while the logs are being loaded." />
                )
            }

            {
                logs.length > 0 ? (
                    <div className="logs__content">
                        <div className="log__hover__content">
                            <LogUserDetails log={hoveredLog} />
                        </div>

                        <table className="logs__table">
                            <thead>
                                <tr>
                                    <th style={{
                                        width: "fit-content"
                                    }}>Icon</th>
                                    <th style={{
                                        width: "fit-content"
                                    }}>User</th>
                                    <th style={{
                                        width: "100%"
                                    }}>Message</th>
                                    <th style={{
                                        width: "fit-content"
                                    }}>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, i) => {
                                    return (
                                        <SingleLog key={log.id} log={log} i={i} setHoveredLog={setHoveredLog} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                ) : (isError && logs.length <= 0 && (
                    <div className="logs__error">
                        <p>Error loading logs. Please try again later.</p>
                        <button className="primary-button" onClick={async () => {
                            await fetchLogs();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                            </svg>

                            <span>Try again</span>
                        </button>
                    </div>
                )
                )
            }
        </div>
    )
};

export default LatestLogs;