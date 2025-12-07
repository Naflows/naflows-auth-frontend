import { ServicesBodyProps } from "@/types/ServicesBodyProps";



export default function ServiceCard({ service }: { service: ServicesBodyProps }) {
    return (
        <div className="service__ownership__transfer">
            <div className="service-card">
                <img src={service.banner || "/public/assets/default_service_icon.png"} alt="Service Icon" className="service-banner" />
                <img src={service.picture || "/public/assets/default_service_icon.png"} alt="Service Icon" className="service-icon" />
                <div className="service-info">
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
            <div className="new__user__card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
                <div className="user-info">
                    <div className="user__overlay" style={{
                        width: "100px"
                    }}></div>
                    <div className="user__overlay" style={{
                        width: "150px"
                    }}></div>
                </div>
            </div>
        </div>
    )
}