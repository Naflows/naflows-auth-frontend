"use client";
import axios from "axios";
import { useTwoFAData } from "./layout";
import switchTwoFAAction from "./utils/switchAction";
import { useEffect, useState } from "react";
import Loader from "@/global/components/Loader";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import ServiceCard from "./subcomponents/service-card";
import { generateTwoFACode } from "@/scripts/modules/2FA/generate-code";
import { redirect } from "next/dist/server/api-utils";




export default function TwoFAPage({
    searchParams
}: {
    searchParams: Promise<{ action?: string; serviceID?: string, redirect?: string }>;
}) {
    const [paramsResolved, setParamsResolved] = useState<{
        action: string;
        serviceID?: string;
        redirect?: string;
    }>({ action: "", serviceID: undefined, redirect: undefined });
    const noParam = paramsResolved.action === "";

    useEffect(() => {
        searchParams.then(resolvedParams => setParamsResolved({
            action: resolvedParams.action || "",
            serviceID: resolvedParams.serviceID,
            redirect: resolvedParams.redirect
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

    const [state, setState] = useState<string>("");



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
                if (response.data.codeSent) {
                    setState("codeSent");
                }
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

                <button className="primary-button" onClick={async () => {
                    // Clear all cookies 
                    await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/2FA/clear-cookie`, {}, {
                        withCredentials: true
                    });
                    window.location.reload();
                }}>
                    Reload the request
                </button>
            </div>
        );
    }

    return (
        <div className="two-fa__module__page">
            <div className="page__content">


                <div className="actions__information">
                    <h3>{TwoFAAction?.title}</h3>
                    <p>{TwoFAAction?.description}</p>

                    {paramsResolved.redirect && (
                            <p className="redirect-note">After successful verification, you will be redirected to: <strong>{paramsResolved.redirect}</strong></p>
                        )
                    }
                </div>


                <div className="actions">
                    {
                        state === "" && (
                            <button className="primary-button" id="confirm-identity-button" style={{
                                margin: "auto",
                                width: "100%",
                            }} onClick={async () => {
                                setLoading(true);
                                const res = await generateTwoFACode(paramsResolved.action, paramsResolved.serviceID);
                                console.log("generateTwoFACode result:", res);
                                if (res.success) {
                                    setState("codeSent");
                                } else if (!res.success) {
                                    setError("An error occurred while generating the 2FA code.");
                                }
                                setLoading(false);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                </svg>

                                <span>Confirm my identity</span>
                            </button>
                        )
                    }


                    {
                        state === "codeSent" && (
                            <div className="code-sent__section">
                                <div className="code-sent__message">
                                    <p>A verification code has been sent to your registered contact method. Please check your email or SMS to retrieve the code.</p>
                                </div>

                                <div className="input">
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                                        <input key={index} type="text" maxLength={1} onInput={() => {

                                            // If key is "backspace", focus the previous input
                                            const input = document.querySelectorAll(".code-input")[index] as HTMLInputElement;
                                            if (input.value.length === 0) {
                                                if (index > 0) {
                                                    const prevInput = document.querySelectorAll(".code-input")[index - 1] as HTMLInputElement;
                                                    if (prevInput) {
                                                        prevInput.focus();
                                                    }
                                                }
                                                return;
                                            }

                                            const nextInput = document.querySelectorAll(".code-input")[index + 1] as HTMLInputElement;
                                            if (nextInput) {
                                                nextInput.focus();
                                            }
                                        }} className="code-input" />
                                    ))}
                                </div>

                                <button className="primary-button" onClick={(async () => {
                                    const code = Array.from(document.querySelectorAll(".code-input")).map(input => (input as HTMLInputElement).value).join("");
                                    console.log("Verifying 2FA code:", code);
                                    await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/2FA/verify-code`, {
                                        action: paramsResolved.action,
                                        data: {
                                            serviceID: paramsResolved.serviceID
                                        },
                                        code: Array.from(document.querySelectorAll(".code-input")).map(input => (input as HTMLInputElement).value).join("")
                                    }, {
                                        withCredentials: true
                                    }).then(response => {
                                        console.log("2FA code verification response:", response.data);
                                        if (response.data.success) {
                                            setError(null);
                                            setState("verified");
                                        } else {
                                            setError("The provided code is incorrect. Please try again.");
                                        }
                                    }).catch(error => {
                                        console.error("Error verifying 2FA code:", error);
                                        setError("An error occurred while verifying the code.");
                                    });
                                })}>
                                    Verify Code
                                </button>
                            </div>
                        )
                    }


                    {
                        state === "verified" && (
                            <div className="verification__success">
                                <h3>Verification Successful</h3>
                                <p>Your identity has been successfully verified. You may now proceed with the requested action.</p>
                                {paramsResolved.redirect && (
                                    <button className="primary-button" onClick={() => {
                                        window.location.href = paramsResolved.redirect!;
                                    }}>
                                        Continue
                                    </button>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}