

export default function LogsDirectory({
    totalLogs,
    totalTabs,
    offset,
    setOffset,
    isError,
    openFilter,
    setOpenFilter
}: {
    totalLogs: number;
    totalTabs: number;
    offset: number;
    setOffset: (offset: number) => void;
    isError: boolean;
    openFilter: boolean;
    setOpenFilter: (open: boolean) => void;
}) {
    return (

        <div className="logs__directory" style={{
            display: isError ? "flex" : "flex"
        }}>
            <div className="logs__tabs__info">
                <span className="total__logs__count">
                    {totalLogs} log{totalLogs !== 1 ? "s" : ""} found
                </span>
                <div className="tabs__directory">
                    {

                        Array.from({ length: totalTabs }, (_, i) => i + 1).map((tab) => {
                            // Only display 5 tabs: current, two before and two after. If no tabs before or after, adjust accordingly
                            const currentTab = Math.floor(offset / 20) + 1;
                            if (currentTab <= 3) {
                                if (tab > 5) return null;
                            } else if (currentTab >= totalTabs - 2) {
                                if (tab <= totalTabs - 5) return null;
                            } else {
                                if (tab < currentTab - 2 || tab > currentTab + 2) return null;
                            }

                            return (
                                <div key={tab} className={`tab__directory__item ${offset === (tab - 1) * 10 ? "active" : ""}`} onClick={() => setOffset((tab - 1) * 10)}>
                                    {tab}
                                </div>
                            )
                        })

                    }
                </div>
            </div>
            <button className="primary-button" id="open-filter" onClick={() => {
                setOpenFilter(!openFilter);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                </svg>

            </button>
        </div>
    )
}