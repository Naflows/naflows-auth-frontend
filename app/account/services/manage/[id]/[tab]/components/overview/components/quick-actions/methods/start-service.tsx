import Loader from "@/global/components/Loader";
import { AlertContentProps } from "@/types/AlertContentProps.type";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";
import axios from "axios";


const StartService = ({
    service,
    setService,
    setAlert,
    displayLoader,
    setDisplayLoader
} : {
    service : ServicesForUserProps;
    setAlert : (alert : AlertContentProps) => void;
    setService : (service : ServicesForUserProps) => void;
    displayLoader : boolean;
    setDisplayLoader : (value : boolean) => void;
}) => {
    const startService = async () => {
        if (!service) return;

        setDisplayLoader(true);


        
        await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/nass/instance/connect`, {
            serviceID: service.id,
        }, {
            withCredentials: true
        }).then((res) => {
            console.log("Connecting response:", res.data);
            if (res.status === 200) {
                console.log("Service started successfully:", res.data);
                setService({
                    ...service,
                    status: service.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                });
                setAlert({
                    message : `Service ${service.name} ${service.status === "ACTIVE" ? "stopped" : "started"} successfully.`,
                    title:  "Operation Successful",
                    success: true,
                    displayCode: false,
                    displaySuccess: true,
                    status: 200,
                    closeAlert: false,
                    customClose: {
                        text: "Great!",
                        action: () => {
                            // Reload to see updated status
                            console.log("Reloading page to see updated status...");
                            window.location.reload();
                        }
                    }
                });

            }
        }).catch((err) => {
            setAlert({
                message : err.response?.data?.message || "An error occurred while starting the service.",
                title: "Something went wrong",
                success: false,
                displayCode: false,
                displaySuccess: false,
                status: 500,
                closeAlert: false
            });
        }).finally(() => {
            setDisplayLoader(false);
        });
    }

    startService();
};

export default StartService;