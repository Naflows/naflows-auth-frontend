


export default function DataMonitoringNoDataSet({
    display = true
}) {
    if (!display) return null;

    return (
        <span id="no-data-collection">
            Your service is not collecting any data yet.
        </span>
    );
}