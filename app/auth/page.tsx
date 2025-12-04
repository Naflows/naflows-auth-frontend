"use client";

import GlobalDisclaimer from "@/global/components/GlobalDisclaimer";
import fetchServiceStatus from "@/scripts/home/status/fetch-status";
import { ServiceStatus } from "@/types/ServiceStatus.type";
import { use, useEffect, useState } from "react";
import RegisterForm from "./form/Register";

import '@/public/root/auth.scss';
import '@/public/root/index.scss';
import LoginForm from "./form/Login";
import { redirect } from "next/dist/server/api-utils";
import { getPublicServiceInformations } from "@/scripts/pages/services/get/get-public-infos";


interface AppLoginBigButtonProps {
    onClick: () => void;
    value: string;
}


async function formatRedirect(redirectUrl: string | undefined): Promise<{
    title: string;
    isDashboard: boolean;
}> {
    if (!redirectUrl) return { title: "your dashboard", isDashboard: true };
    // account/services/manage/ regex -> fetch the * in account/services/manage/*/...
    const regex = /account\/services\/manage\/([a-zA-Z0-9-_]+)/;
    const match = redirectUrl.match(regex);
    if (match && match[1]) {
        console.log("Trying to fetch service info for redirect:", match[1]);
        const data = await getPublicServiceInformations(match[1], null);
        console.log("Fetched service info for redirect:", data);
        if (data) {
            return { title: `${data.name}'s Service Dashboard`, isDashboard: false };
        } else {
            return { title: "/account/services", isDashboard: false };
        }
    }
    return { title: "your dashboard", isDashboard: true };
}

const AppLoginBigButton = ({ onClick, value }: AppLoginBigButtonProps) => {
    return (
        <button className="tertiary-button" onClick={onClick}>
            {value}
        </button>
    );
};

export default function AuthPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    // React.use()
    const { form, reason, redirect } = use(searchParams);

    const formType = form === "register" ? "register" : "login";
    const logoutReason = reason as string | undefined;
    const redirectReason = redirect as string | undefined;
    useEffect(() => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("form", formType);
        window.history.replaceState(null, "", newUrl);
    }, [formType]);


    const [status, setStatus] = useState<ServiceStatus | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            const status = await fetchServiceStatus();
            setStatus(status);
        };

        fetchStatus();

        const intervalId = setInterval(fetchStatus, 15000);

        return () => clearInterval(intervalId);
    }, []);

    const [serviceInfo, setServiceInfo] = useState<{ title: string; isDashboard: boolean }>({ title: "", isDashboard: false });

    useEffect(() => {
        const fetchServiceInfo = async () => {
            const info = await formatRedirect(redirectReason);
            setServiceInfo(info);
        };

        fetchServiceInfo();
    }, [redirectReason]);

    return (
        <div className="col-20 global__nass__form">
            <div className="panel" style={{
                marginTop: (logoutReason != '' || redirectReason != '') ? "10px" : "80px",
            }}>
                <div className="disclaimers__container">
                    {
                        logoutReason && <GlobalDisclaimer
                            allowHidden={false}
                            title={`You have been logged out`}
                            message={""}
                            maxWidth={true}
                            fixed={false}
                            content={<>
                                {logoutReason === "outdated-session" && <p>Your session has expired due to inactivity. Please log in again to continue.</p>}
                                {logoutReason === "manual-logout" && <p>You have successfully logged out. We hope to see you again soon!</p>}
                                {logoutReason === "session-revoked" && <p>Your session has been revoked. Please log in again to continue.</p>}
                            </>}
                        />
                    }
                    {
                        redirectReason && <GlobalDisclaimer
                            allowHidden={true}
                            title={`This login will redirect you`}
                            message={""}
                            maxWidth={true}
                            fixed={false}
                            content={<>
                                <p>
                                    Once logged in, you will be redirected to <b>{serviceInfo.title}</b>. {!serviceInfo.isDashboard && <>If you wish to log in to your account dashboard, please use <a href="/account">https://auth.naflows.com/account</a> instead.</>}
                                </p>
                            </>}
                        />
                    }
                </div>
                <div className="panel-body">
                    <img
                        src="https://naflows.com/public/assets/naflows_full_logotype.png"
                        alt="Naflows Logo"
                        className="logo"
                        style={{ height: "100px" }}
                    />
                    <div className="panel-header">
                        <h1>
                            {formType === "login"
                                ? "Welcome back to the NASS"
                                : "Create an account"}
                        </h1>
                        <p>
                            {formType === "login"
                                ? "Please enter your credentials. If you don't have an account, you can create one."
                                : "Please fill in the form to create an account. Once your account is created, you will receive your set identifier and customer ID via email."}
                        </p>
                    </div>
                    <div className="form">
                        {formType === "login" ? <LoginForm redirectOnSuccess={redirectReason} /> : <RegisterForm />}
                    </div>
                </div>
                <div className="panel-footer">
                    <div className="footer-left">
                        <div className="footer__part">
                            <h5>
                                {formType === "login"
                                    ? "Having trouble logging in?"
                                    : "Need help with registration?"}
                            </h5>
                            <div className="footer-buttons-container">
                                <AppLoginBigButton onClick={() => { }} value="I forgot my password" />
                                <AppLoginBigButton onClick={() => { }} value="I forgot my customer ID" />
                            </div>
                        </div>
                        <div className="footer__part">
                            <h5>Trouble understanding our system?</h5>
                            <div className="footer-buttons-container">
                                <AppLoginBigButton onClick={() => { window.location.href = "https://naflows.com/nass-sso"; }} value="Learn more about NASS SSO" />
                                <AppLoginBigButton onClick={() => { window.location.href = "https://naflows.com/support"; }} value="Contact Support" />
                            </div>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="service__status__small">
                            <span className={`service__status__indicator  ${status && status.disk.usagePercent
                                ? "service__status__indicator--active"
                                : "service__status__indicator--inactive"
                                }`}
                                data-tooltip={status && status.disk.usagePercent
                                    ? `Disk Usage: ${status.disk.usagePercent}`
                                    : "Service is currently unreachable"}
                            >
                                Service {status && status.disk.usagePercent ? "Online" : "Offline"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const MetaData = {
    title: "NASS Authentication",
    description: "Log in or register to access your NASS account and services.",
};

export { MetaData };