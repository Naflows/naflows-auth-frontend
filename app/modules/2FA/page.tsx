"use client";
import axios from "axios";
import { useTwoFAData } from "./layout";
import switchTwoFAAction from "./utils/switchAction";
import { useEffect, useState } from "react";
import Loader from "@/global/components/Loader";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import ServiceCard from "./subcomponents/service-card";

export default function TwoFAPage({
    searchParams
}: {
    searchParams: Promise<{ action?: string; serviceID?: string }>
}) {
    const [paramsResolved, setParamsResolved] = useState<{
        action: string;
        serviceID?: string;
    }>({ action: "", serviceID: undefined });
    const noParam = paramsResolved.action === "";

    useEffect(() => {
        searchParams.then(resolvedParams => setParamsResolved({
            action: resolvedParams.action || "",
            serviceID: resolvedParams.serviceID
        }));
    }, [searchParams]);

    const [TwoFAAction, setTwoFAAction] = useState<{
        title: string;
        description: string;
        service?: ServicesBodyProps;
    } | null>(null);
    useEffect(() => {
        if (paramsResolved.action) {
            switchTwoFAAction(paramsResolved.action, paramsResolved.serviceID)
                .then(actionData => {
                    setTwoFAAction(actionData);
                });
        }
    }, [paramsResolved.action, paramsResolved.serviceID]);
    const { user } = useTwoFAData();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user && paramsResolved.action) {
            console.log("Performing 2FA action setup/init:", {
                action: paramsResolved.action,
                data: {
                    serviceID: paramsResolved.serviceID
                }
            });


            axios.post(
                `${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/2FA/create`,
                {
                    action: paramsResolved.action,
                    data: {
                        serviceID: paramsResolved.serviceID
                    }
                },
                {
                    withCredentials: true
                }
            ).then(response => {
                console.log("2FA setup/init response:", response.data);
                // Add a parameter to the current URL without reloading the page
            }).catch(error => {
                console.error("Error during 2FA setup/init:", error);
                setError("An error occurred while initializing the 2FA action.");
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [user, paramsResolved.action, paramsResolved.serviceID]);


    if (loading) {
        return (<span className="small-loader" style={{
            margin: "auto"
        }}></span>)
    } else if (noParam) {
        return (
            <div className="two-fa__module__info">
                <h3>No action specified</h3>
                <p>Please provide a valid action to perform 2FA operations.</p>
            </div>
        );
    } else if (error) {
        return (
            <div className="two-fa__module__error">
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="two-fa__module__page">
            <div className="page__content">


                <div className="actions__information">
                    <h3>{TwoFAAction?.title}</h3>
                    <p>{TwoFAAction?.description}</p>
                </div>


                <div className="actions">
                    <button className="primary-button">
                        Confirm my identity
                    </button>
                </div>
            </div>
        </div>
    );
}