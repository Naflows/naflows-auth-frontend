// NextJS loading component displayed while fetching user data

import Loader from "@/global/components/Loader";

export default function Loading() {
    return (
            <Loader loading={true} title="Loading account informations" message="Fetching data from Naflows..." />
    );
}

