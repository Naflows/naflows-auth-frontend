import axios from "axios";
import { useEffect } from "react";

const useSessionValid = () => {
    const x = 5; // seconds - normally 60
    const y = 5;

    useEffect(() => {
        let intervalId: number | null = null;
        console.log("Setting up session validity check interval.");
        const timeoutId = window.setTimeout(() => {
            intervalId = window.setInterval(async () => {
                console.log("Checking session validity...");
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/client/secure/session-check`, {}, {
                        withCredentials: true
                    });
                    console.log("Session validity response is:", response, `Status: ${response.status}`);
                    if (!response.status || response.status !== 200) {
                        window.location.href = "/auth?form=login&reason=outdated-session&redirect=" + window.location.pathname;
                    }
                } catch (error) {
                    console.error("Error checking session validity:", error);
                    window.location.href = "/auth?form=login&reason=outdated-session&redirect=" + window.location.pathname;
                }
            }, x * 1000);
        }, y * 1000); // wait 60s before starting the periodic check

        return () => {
            window.clearTimeout(timeoutId);
            if (intervalId !== null) {
                window.clearInterval(intervalId);
            }
        };
    }, []);
}

export default useSessionValid;