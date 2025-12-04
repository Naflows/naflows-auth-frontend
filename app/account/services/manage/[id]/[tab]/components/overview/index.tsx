import { ServicesForUserProps } from "@/types/ServicesForUserProps";
import QuickActions from "./components/quick-actions"
import ServiceLoosenedView from "@/app/account/services/components/loosened.view";
import ServiceCapacities from "./components/sub-component/capacities";
import ServiceAlerts from "./components/sub-component/alerts";
import SecurityMeasures from "@/app/account/services/components/security-measures";


const ManageServiceOverview = ({
    service,
    setService
}: {
    service: null | ServicesForUserProps;
    setService: (service: ServicesForUserProps) => void;
}) => {


    console.log("Rendering ManageServiceOverview with service:", service);

    return (
            <div className="manage__service__body">
                <div
                    className="parent__of__section row__layout service__manage__content"
                    style={{
                        width: "100%"
                    }}
                >
                    <div className="global__content">
                        <div className="parent__of__section row__layout" id="left-side">
                            <ServiceLoosenedView service={service} />
                        </div>

                        <div className="parent__of__section row__layout" id="right-side">
                            <div className="right__side__header">
                                <QuickActions service={service} setService={setService} />
                                <ServiceCapacities service={service} />
                            </div>
                            <ServiceAlerts service={service!} />

                        </div>
                    </div>



                </div>
            </div>
    )
}

export default ManageServiceOverview;