import Loader from "@/global/components/Loader";


export default function Loading() {
    return (
        <Loader loading={true} title="Creating new service" message="Preparing service creation workflow..." />
    )
}