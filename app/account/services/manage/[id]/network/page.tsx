'use client';

import '@/public/root/pages/services/manage/sub-components/Network.scss';
import ServiceNetworkIdentity from "./components/network-identity";
import 'chartjs-adapter-date-fns';
import TrafficOverview from "./components/traffic-chart";
import { ServicesForUserProps } from '@/types/ServicesForUserProps';
import { ServicesCompleteBodyProps } from '@/types/ServicesCompleteProps';
import { useServiceData } from '../layout';

export default function ServiceNetwork() {
    const { service } = useServiceData() || {};


    return (
        <div className="service__network__component">
            <ServiceNetworkIdentity service={service} />
            <div id="right">
                <TrafficOverview service={service} />
            </div>
        </div>
    )
}

