import { dateToTimespan } from "@/scripts/utils/dateToTimespan";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import Markdown from "react-markdown";

function SmallAlertBadge({
    title, link, appears, type
}: {
    title: string;
    link: string;
    appears: boolean;
    type?: "warning" | "info";
}) {
    if (appears === false) {
        return null;
    }

    return (
        <a href={link} className={`small-alert-badge ${type ? `small-alert-badge--${type}` : ""}`} target="_blank" rel="noopener noreferrer">
            <span>{title}</span>
        </a>
    )
}

export default function ServiceDetails({ service }: { service: ServicesBodyProps }) {
    return (
        <div className="section">
            <div className="service__informations__header">
                <h1 className="service__name__header">
                    <span className="service__name">{service.name}</span>
                    <span>
                        Created {dateToTimespan(service.created_at)}
                    </span>
                </h1>
                <div className="service__description__details__container">
                    <div className="service__description__details">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" /></svg>
                            <a
                                href={`https://${service.dns}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tertiary-button"
                            >
                                {service.dns}
                            </a>
                        </span>
                        <span style={{ display: service.details.official ? "inline-flex" : "none" }} className="official-badge" title="This service is owned and operated by Naflows, which means it has been developed in-house and is maintained directly by the Naflows team.">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m438-452-56-56q-12-12-28-12t-28 12q-12 12-12 28.5t12 28.5l84 85q12 12 28 12t28-12l170-170q12-12 12-28.5T636-593q-12-12-28.5-12T579-593L438-452Zm42 368q-7 0-13-1t-12-3q-135-45-215-166.5T160-516v-189q0-25 14.5-45t37.5-29l240-90q14-5 28-5t28 5l240 90q23 9 37.5 29t14.5 45v189q0 140-80 261.5T505-88q-6 2-12 3t-13 1Z" /></svg>
                            Naflows-Owned Service
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm698 112q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160H738ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z" /></svg>
                            {service.details.users} user{service.details.users > 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="alerts">
                        <SmallAlertBadge
                            title="Service is not reviewed by Naflows yet"
                            link={`https://${service.dns}/privacy-policy#unreviewed-service`}
                            appears={!service.approved}
                            type="warning"
                        />
                        <SmallAlertBadge
                            title="Third-Party Service"
                            appears={!service.details.official}
                            link={`https://${service.dns}/privacy-policy#third-party-service`}
                            type="info"
                        />
                    </div>
                </div>

                <div className="service__description__content">
                    <Markdown>{service.description || "No description provided."}</Markdown>
                </div>
            </div>

        </div>
    )
}