import DataPolicyItem from "@/app/account/services/manage/[id]/data-monitoring/components/global/data-policy-item";
import { DataPolicy } from "@/app/account/services/manage/[id]/data-monitoring/setup/utils/policies";
import { useEffect, useRef } from "react";



export default function DataPolicyDetails({
    policy,
    setPolicy
}: {
    policy: DataPolicy | null;
    setPolicy: React.Dispatch<React.SetStateAction<DataPolicy | null>>;
}) {

    const ref = useRef<HTMLDivElement>(null);

    // If something else is clicked than the current .data-policy-item, close the details view
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // Close the details view
                // This can be handled by the parent component by setting policy to null
                setPolicy(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    if (!policy) {
        return null;
    }
    
    return (
        <div className="display__override__policy__details" >
            <div ref={ref} className="details-view">
                <DataPolicyItem policy={policy} hoverDisabled={true} />
            </div>
        </div>
    )
}