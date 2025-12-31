import { AlertContentProps } from "@/types/AlertContentProps.type";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";
import axios from "axios";


const StartService = ({
    service,
    setService,
    setAlert,
    setDisplayLoader
}: {
    service: ServicesForUserProps;
    setAlert: (alert: AlertContentProps) => void;
    setService: (service: ServicesForUserProps) => void;
    setDisplayLoader: (value: boolean) => void;
}) => {
    const startService = async () => {
        if (!service) return;

        setDisplayLoader(true);



        const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/nass/instance/connect`, {
            serviceID: service.id,
        }, {
            withCredentials: true
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log("erro called")
            console.log("Error starting service:", err);
            setAlert({
                message: err.response?.data?.message || "An error occurred while starting the service.",
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


        console.log("Connecting response:", response.data);
        if (response.data.status === 200) {
            console.log("Service started successfully:", response.data);
            setService({
                ...service,
                status: response.data.service_status || service.status
            });
            setAlert({
                message: `Service ${service.name} ${service.status === "ACTIVE" ? "stopped" : "started"} successfully.`,
                title: "Operation Successful",
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
            })
        }
    }

    startService();
};

export default StartService;