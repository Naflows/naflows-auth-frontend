import Loader from "@/global/components/Loader";


export default function LoadingServices() {
    return (
        <Loader loading={true} title="Loading services" message="Fetching services data from Naflows..." />
    );
}