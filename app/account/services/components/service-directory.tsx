import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps"
import { accountTabs } from "@/types/ServiceManagement"
import SwitchServiceDirectoryIcon from "./util/switch-service-directory-icon";
import React from "react";

function ArrowSVG() {
    return (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" /></svg>)
}

const AccountDirectory = ({ service, tab, title, description }: {
    service: ServicesCompleteBodyProps | null,
    tab: accountTabs,
    title: string,
    description: string
}) => {

    if (!service) return null;

    const url = (new URLSearchParams(window.location.search)).toString();
    // Query everything after the service ID so /x/x/x/id/(here)
    // Convert to list of strings
    const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);


    return (
        <div className="service__management__header">
            <div className="service__management__dir">
                <a href="/account/services" className="service__management__dir__link">Services</a>
                <ArrowSVG />
                <a onClick={() => {
                    window.location.href = `/account/services/manage/${service.id}`
                }}
                    className="service__management__dir__link">{service.name}</a>
                {pathSegments && pathSegments.length > 0 &&
                    
                    pathSegments.map((segment, index) => {
                        // Skip the first 5 segments (account/services/manage/id/tab)
                        if (index < 4) return null;
                        return (
                            <a key={index} href={`/account/services/manage/${service.id}/${tab}/${pathSegments.slice(5, index + 1).join('/')}${url ? `?${url}` : ''}`} className="service__management__dir__link">
                                <ArrowSVG />
                                <span className="service__management__dir__current">{segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}</span>
                            </a>
                        )
                    })
                }
            </div>
            <div className="management__header__body">
                <div className="icon">
                    <SwitchServiceDirectoryIcon currentTab={tab} />
                </div>
                <div className="service__management__header__content">
                    <h2 className="service__management__title">
                        {title}
                    </h2>
                    <p className="service__management__subtitle">
                        {description}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default AccountDirectory;