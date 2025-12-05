import '@/public/root/pages/services/manage/sub-components/Network.scss';
import ServiceNetworkIdentity from "./components/network-identity";
import 'chartjs-adapter-date-fns';
import TrafficOverview from "./components/traffic-chart";
import { ServicesForUserProps } from '@/types/ServicesForUserProps';
import { ServicesCompleteBodyProps } from '@/types/ServicesCompleteProps';

const ServiceNetwork = ({
    service
}: {
    service: ServicesForUserProps | ServicesCompleteBodyProps | null;
}) => {


    return (
        <div className="service__network__component">
            <ServiceNetworkIdentity service={service} />
            <div id="right">
                <TrafficOverview service={service} />
            </div>
        </div>
    )
}

export default ServiceNetwork;