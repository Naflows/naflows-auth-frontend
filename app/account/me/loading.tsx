// NextJS loading component displayed while fetching user data

import Loader from "@/global/components/Loader";

export default function Loading() {
    return (
        <div className="nass__page__loader">
            <h3>Loading account informations</h3>
            <Loader loading={true} />
        </div>
    );
}

